import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AzureService } from "app/core/azure/azure.service";
import { TipoParametro } from "app/core/types/formatos.types";
import { ParamI } from "app/shared/models/formatos";
import { UiDialogsComponent } from "app/shared/ui/ui-dialogs/ui-dialogs.component";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { EditarFormatoService } from "../../formatos/editar-formato/editar-formato.service";

//SERVICES
import { ActivitiesService } from "../activities.service";

@Component({
  selector: "app-acta-conformidad",
  templateUrl: "./acta-conformidad.component.html",
  styleUrls: ["./acta-conformidad.component.scss"],
})
export class ActaConformidadComponent implements OnInit {
  isLoading = true;
  isEdit = false;
  loadLoading = false;
  idActa: number;
  savingData: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isFieldLoading: boolean;
  parameters: ParamI[] = [];

  formGroup: FormGroup = this.fb.group({});
  idActividadFormatoActa: any;
  actaData: any;
  cliente: any;
  os: any;

  constructor(
    private fb: FormBuilder,
    private activitiesService: ActivitiesService,
    private activeRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private asignationService: EditarFormatoService,
    private _azureService: AzureService
  ) {
    this.getIdAcataConformidad();
  }

  ngOnInit(): void {
    this.getDataActa();
  }

  private getIdAcataConformidad(): void {
    this.activeRoute.params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((params) => {
        this.idActa = Number(params["idActividad"]);
        this.getActa();
      });
  }

  private getActa(): void {
    this.activitiesService
      .getActaConformidad(this.idActa)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((resp) => {
        this.isLoading = false;
      });
  }

  getDataActa(): void {
    this.activitiesService
      .getDataActa(this.idActa)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((resp) => {
        this.actaData = resp.body?.secciones[0];
        this.actaData.grupos = this.actaData.grupos.filter(
          (group) => group.activo
        );
        this.cliente = resp.body.cliente;
        this.os = resp.body.os;
        this.idActividadFormatoActa = resp.body.idActividadFormatoActa;
        this.generateForm();
      });
  }

  private generateForm() {
    this.actaData?.grupos.forEach((grupo, j) => {
      grupo?.parametros.forEach((parametro, k) => {
        if (parametro.activo) {
          if (
            parametro.idParametro === TipoParametro.UPLOAD ||
            parametro.idParametro === TipoParametro.IMAGEN ||
            parametro.idParametro === TipoParametro.FIRMA
          ) {
          }
          if (parametro.idParametro === TipoParametro.CHECKBOX) {
            this.formGroup.addControl(
              `${this.getParametroControl({ j, k })}`,
              new FormControl({
                value: parametro.valor === "true" ? true : false,
                disabled: true,
              })
            );
          } else if (parametro.idParametro === TipoParametro.FECHA) {
            this.formGroup.addControl(
              `${this.getParametroControl({ j, k })}`,
              new FormControl({
                value: this.convertDate(parametro.valor),
                disabled: true,
              })
            );
          } else {
            this.formGroup.addControl(
              `${this.getParametroControl({ j, k })}`,
              new FormControl({
                value: parametro.valor,
                disabled: true,
              })
            );
          }

          this.setParamConfig(parametro, j, k);

          /**OBSERVE PARAM */
        }
      });
    });
  }

  setParamConfig(parametro, j: number, k: number): void {
    parametro.editable
      ? this.formGroup.controls[
          `${this.getParametroControl({ j, k })}`
        ].enable()
      : this.formGroup.controls[
          `${this.getParametroControl({ j, k })}`
        ].disable();

    this.formGroup.controls[
      `${this.getParametroControl({ j, k })}`
    ].setValidators([
      parametro.obligatorio ? Validators.required : Validators.nullValidator,
      Validators.minLength(parametro.minCaracteres),
      Validators.maxLength(parametro.maxCaracteres),
      !parametro.regex || parametro.regex === ""
        ? Validators.nullValidator
        : parametro.regex === "2"
        ? Validators.email
        : Validators.pattern(/^\d{8}(?:[-\s]\d{4})?$/),
    ]);
  }

  getParametroControl({ j, k }) {
    return `${j}-${k}`;
  }

  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  setImage(src: string): string {
    return this._azureService.getResourceUrlComplete(src);
  }

  async onChageFile(event: any, y: any) {}

  removeSign(x, y, z): void {}

  splitOptions(options: string): string[] {
    return options.split(",");
  }

  getErrorMessage(input: string) {
    const control = this.formGroup.get(input);
    if (control) {
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
  }

  //postActa(e: MouseEvent, indexGroup: number, paramIdx?: number): void {
  postActa(e: MouseEvent): void {
    //if (this.form.valid) {
    //console.log("this form ", this.form.value);
    this.actaData.grupos.forEach((grupo, j) => {
      //if (indexGroup === j) {
      //this.groups[j] = false;
      //}

      grupo.parametros.forEach((parametro, k) => {
        parametro.idActividadFormato = Number(this.idActa);
        if (parametro.activo) {
          if (
            parametro.idParametro === TipoParametro.UPLOAD ||
            parametro.idParametro === TipoParametro.IMAGEN
          ) {
            this.checkImgParam(parametro, j, k);
          } else if (parametro.idParametro === TipoParametro.FIRMA) {
            //this.checkSignParam(paramIdx, parametro, indexGroup, k, j);
          } else if (parametro.idParametro === TipoParametro.FECHA) {
            parametro.valor = this.formGroup.get(
              this.getParametroControl({ j, k })
            ).value;
          } else {
            parametro.valor = String(
              this.formGroup.get(this.getParametroControl({ j, k })).value
            );
          }
        }
      });
    });
    let parametros = [];
    this.actaData.grupos.map((group) => {
      parametros = [...parametros, ...group.parametros];
    });
    const payload = {
      parametros: parametros,
      cliente: this.cliente,
      id: this.idActividadFormatoActa,
      os: this.os,
    };
    console.log("payload ", payload);
    if (!payload.cliente || !payload.os) {
      this.matDialog.open(UiDialogsComponent, {
        data: {
          title: "Error",
          message:
            "No existe Información para dicha acta de conformidad, favor registre la data desde el APP!",
        },
        width: "500px",
      });
    } else {
      this.activitiesService
        .postActaConformidad(payload)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
          () => {
            this.savingData = false;
            //this.router.navigate(["/admin/informes/list"]);
          },
          (err) => {
            this.matDialog.open(UiDialogsComponent, {
              data: {
                title: "Error",
                message: err?.error
                  ? err?.error
                  : "Error al guardar el acta, verifique su conexión a internet!",
              },
              width: "500px",
            });
            this.savingData = false;
          }
        );
    }
    console.log("this.formGroup ", this.formGroup.errors);
    console.log("this.formGroup errors ", this.formGroup.errors);
    e.preventDefault();
  }

  checkImgParam(parametro, j, k): void {
    parametro.valor = String(
      this.formGroup.get(this.getParametroControl({ j, k })).value
    );
    if (!parametro.valor || parametro.valor === "") {
      this.formGroup
        .get(this.getParametroControl({ j, k }))
        .setValue(parametro.dato);
    }
  }

  checkSignParam(paramIdx, parametro, indexGroup, k, j): void {
    if (typeof paramIdx === "number") {
      if (paramIdx === k && indexGroup === j) {
        parametro.valor = null;
        this.formGroup.get(this.getParametroControl({ j, k })).setValue(null);
      }
    } else {
      if (
        this.formGroup.get(this.getParametroControl({ j, k })).value &&
        this.formGroup.get(this.getParametroControl({ j, k })).value !== ""
      ) {
        parametro.valor = String(
          this.formGroup.get(this.getParametroControl({ j, k })).value
        );
      } else {
        parametro.valor = null;
      }
    }
  }
}
