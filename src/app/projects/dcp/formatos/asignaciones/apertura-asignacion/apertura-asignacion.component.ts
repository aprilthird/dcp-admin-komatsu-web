import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { EditarFormatoService } from "../../editar-formato/editar-formato.service";
import { ActivatedRoute, Route } from "@angular/router";

//CONFIG
import { TipoParametro } from "app/core/types/formatos.types";
import { AzureService } from "app/core/azure/azure.service";
import { ListadoAsignacionesService } from "../asignaciones.service";

@Component({
  selector: "app-apertura-asignacion",
  templateUrl: "./apertura-asignacion.component.html",
  styleUrls: ["./apertura-asignacion.component.scss"],
})
export class AperturaAsignacionComponent implements OnInit {
  @Input("id") id;
  data: any;
  loading: boolean = true;
  form: FormGroup = this.fb.group({});
  filesLoading: {
    [key: string]: boolean;
  } = {};
  editLoading: boolean;
  f: boolean;

  constructor(
    private _editarFormatoService: EditarFormatoService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _azureService: AzureService,
    private _asignacionesService: ListadoAsignacionesService
  ) {
    this.id = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this._editarFormatoService
      .getAbrirAsignacion(this.id)
      .subscribe((response) => {
        this.data = response.body;
        this.generateForm();
        this.loading = false;
      });
  }

  generateForm() {
    this.data.secciones.forEach((seccion, i) => {
      seccion.grupos.forEach((grupo, j) => {
        grupo.parametros.forEach((parametro, k) => {
          if (parametro.activo) {
            if (
              parametro.idParametro === TipoParametro.UPLOAD ||
              parametro.idParametro === TipoParametro.IMAGEN ||
              parametro.idParametro === TipoParametro.FIRMA
            ) {
              this.filesLoading[`${i}-${j}-${k}`] = false;
            }
            if (parametro.idParametro === TipoParametro.CHECKBOX) {
              this.form.addControl(
                `${this.getParametroControl({ i, j, k })}`,
                new FormControl({
                  value: parametro.valor === "true" ? true : false,
                  disabled: true ? !parametro.editable : false,
                })
              );
            } else {
              this.form.addControl(
                `${this.getParametroControl({ i, j, k })}`,
                new FormControl(
                  {
                    value: parametro.valor,
                    disabled: true ? !parametro.editable : false,
                  }

                  //[parametro.valor, { disabled: true }]
                  /*? parametro.dato === null
                      : parametro.dato,
                    disabled: true ? !parametro.editable : false,*/
                  //this.getValidatorByParametro(parametro)
                )
              );
            }
          }
        });
      });
    });
  }

  getValidatorByParametro(parametro) {
    if (parametro.idParametro !== 6 && parametro.idParametro !== 7) {
      const validators = [];
      if (parametro.obligatorio) validators.push(Validators.required);
      if (parametro.regex) validators.push(Validators.pattern(parametro.regex));
      if (parametro.minCaracteres)
        validators.push(Validators.minLength(parametro.minCaracteres));
      if (parametro.maxCaracteres)
        validators.push(Validators.maxLength(parametro.maxCaracteres));

      return validators;
    }
  }

  getParametroControl({ i, j, k }) {
    return `${i}-${j}-${k}`;
  }

  clickOpenFile(resourceName) {
    window.open(
      this._azureService.getResourceUrlComplete(resourceName),
      "blank"
    );
  }

  onSubmit(e: MouseEvent): void {
    if (!this.loading && this.form.valid) {
      this.editLoading = true;
      const data = { ...this.data };

      data.secciones.forEach((seccion, i) => {
        seccion.grupos.forEach((grupo, j) => {
          grupo.parametros.forEach((parametro, k) => {
            if (parametro.activo) {
              if (
                parametro.idParametro === TipoParametro.UPLOAD ||
                parametro.idParametro === TipoParametro.IMAGEN
              ) {
                if (parametro.valor === null || parametro.valor === "") {
                  this.form
                    .get(this.getParametroControl({ i, j, k }))
                    .setValue(parametro.dato);
                }
              }
              parametro.valor = String(
                this.form.get(this.getParametroControl({ i, j, k })).value
              );
            }
          });
        });
      });

      this._asignacionesService.editAsignacion(data).subscribe((data) => {
        this.editLoading = false;
      });
    }
    e.preventDefault();
  }

  async onChageFile(event: any, control: string) {
    if (event) {
      const { target } = event;
      const file = target.files[0];
      const blob = new Blob([file], { type: file.type });
      this.filesLoading[`${control}`] = true;
      try {
        const response = await this._azureService.uploadFile(blob, file.name);
        this.form.get(control).setValue(response.uuidFileName);
      } catch (e) {}
      this.filesLoading[`${control}`] = false;
    } else {
      this.form.get(control).setValue("");
    }
  }

  setImage(src: string): string {
    return this._azureService.getResourceUrlComplete(src);
  }

  getErrorMessage(input: string) {
    const control = this.form.get(input);

    if (control.hasError("required")) {
      return "Campo requerido";
    }

    if (control.hasError("minlength")) {
      return `Debe tener mínimo ${control.errors.minlength.requiredLength}`;
    }

    if (control.hasError("maxlength")) {
      return `Debe tener máximo ${control.errors.maxlength.requiredLength}`;
    }

    if (control.hasError("pattern")) {
      return `Formato incorrecto`;
    }

    return control.hasError("email") ? "Formato de correo incorrecto" : "";
  }

  splitOptions(options: string): string[] {
    return options.split(",");
  }

  getFirstOption(options: string): string {
    return options.split(",")[0];
  }
}
