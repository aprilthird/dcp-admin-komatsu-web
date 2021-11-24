import { Component, Inject, Input, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AzureService } from "app/core/azure/azure.service";
import { TipoParametro } from "app/core/types/formatos.types";
import { ListadoAsignacionesService } from "../../asignaciones/asignaciones.service";
import { EditarFormatoService } from "../../editar-formato/editar-formato.service";

@Component({
  selector: "app-dialog-previsualizar",
  templateUrl: "./dialog-previsualizar.component.html",
  styleUrls: ["./dialog-previsualizar.component.scss"],
})
export class DialogPrevisualizarComponent implements OnInit {
  @Input("id") id;
  @Input("isAsignacion") isAsignacion: boolean = false;
  loading: boolean = true;

  filesLoading: {
    [key: string]: boolean;
  } = {};

  form: FormGroup = this.fb.group({});

  data: any;
  options: string[] = [];

  constructor(
    private fb: FormBuilder,
    public _dialogRef: MatDialogRef<DialogPrevisualizarComponent>,
    private _editarFormatoService: EditarFormatoService,
    private _asignacionesService: ListadoAsignacionesService,
    private _azureService: AzureService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any
  ) {}

  ngOnInit(): void {
    if (this.isAsignacion) {
      this._editarFormatoService
        .getAbrirAsignacion(this.id)
        .subscribe((response) => {
          this.data = response.body;
          this.generateForm();
          this.loading = false;
        });
    } else {
      this._editarFormatoService
        .getObtenerFormatoCompleto(this.id)
        .subscribe((response) => {
          this.data = response.body;
          this.generateForm();
          this.loading = false;
        });
    }
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

            if (parametro.idParametro === TipoParametro.SELECCION) {
              if (parametro.dato.length > 0)
                this.options = parametro.dato.split(",");
            }

            this.form.addControl(
              `${this.getParametroControl({ i, j, k })}`,
              new FormControl(
                {
                  value: parametro.valor
                    ? parametro.dato === null
                    : parametro.dato,
                  disabled: true ? !parametro.editable : false,
                },
                this.getValidatorByParametro(parametro)
              )
            );
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

  onSubmit() {
    if (this.isAsignacion && !this.loading && this.form.valid) {
      this.loading = true;
      const data = { ...this.data };

      data.secciones.forEach((seccion, i) => {
        seccion.grupos.forEach((grupo, j) => {
          grupo.parametros.forEach((parametro, k) => {
            if (parametro.activo) {
              parametro.valor = String(
                this.form.get(this.getParametroControl({ i, j, k })).value
              );
            }
          });
        });
      });

      this._asignacionesService.editAsignacion(data).subscribe((data) => {
        this.loading = false;
        this._dialogRef.close();
      });
    }
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

  previewImage(resourceName) {
    return this._azureService.getResourceUrlComplete(resourceName);
  }

  clickOpenFile(resourceName) {
    window.open(
      this._azureService.getResourceUrlComplete(resourceName),
      "blank"
    );
  }

  setImage(src: string): string {
    return this._azureService.getResourceUrlComplete(src);
  }

  splitOptions(options: string): string[] {
    return options.split(",");
  }
  getFirstOption(options: string): string {
    return options.split(",")[0];
  }
}
