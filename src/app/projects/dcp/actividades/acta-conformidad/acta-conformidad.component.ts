import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { FuseAlertType } from "@fuse/components/alert";
import { AzureService } from "app/core/azure/azure.service";
import { TipoParametro } from "app/core/types/formatos.types";
import { ParamI } from "app/shared/models/formatos";
import { UiDialogsComponent } from "app/shared/ui/ui-dialogs/ui-dialogs.component";
import { environment } from "environments/environment";
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
  isLoaded;
  isLoading = true;
  isEdit = false;
  loadLoading = false;
  idActa: number;
  savingData: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isFieldLoading: boolean;
  parameters: ParamI[] = [];
  alert: { type: FuseAlertType; message: string };

  formGroup: FormGroup = this.fb.group({});
  idActividadFormatoActa = 0;
  actaData: any;
  cliente: any;
  os: any;

  filesLoading: {
    [key: string]: boolean;
  } = {};
  loadingReport: boolean;

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
      });
  }

  getDataActa(): void {
    this.isLoaded = true;

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
        this.isLoading = false;
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
            this.filesLoading[`${j}-${k}`] = false;
          }
          if (parametro.idParametro === TipoParametro.CHECKBOX) {
            this.formGroup.addControl(
              `${this.getParametroControl({ j, k })}`,
              new FormControl(parametro.valor === "true" ? true : false)
            );
          } else if (parametro.idParametro === TipoParametro.FECHA) {
            this.formGroup.addControl(
              `${this.getParametroControl({ j, k })}`,
              //new FormControl(this.convertDate(parametro.valor))
              new FormControl(parametro.valor)
            );
          } else {
            this.formGroup.addControl(
              `${this.getParametroControl({ j, k })}`,
              new FormControl(parametro.valor)
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
      parametro.obligatorio &&
      parametro.idParametro !== TipoParametro.UPLOAD &&
      parametro.idParametro !== TipoParametro.FIRMA &&
      parametro.idParametro !== TipoParametro.IMAGEN &&
      parametro.idParametro !== TipoParametro.LABEL
        ? Validators.required
        : Validators.nullValidator,
      Validators.minLength(
        parametro.minCaracteres ? parametro.minCaracteres : 0
      ),
      Validators.maxLength(
        parametro.maxCaracteres ? parametro.maxCaracteres : undefined
      ),
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

  private convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    if (
      [date.getFullYear(), mnth, day].join("-").indexOf("NaN") > -1 ||
      [date.getFullYear(), mnth, day].join("-").indexOf("aN") > -1
    ) {
      return "";
    } else {
      return [date.getFullYear(), mnth, day].join("-");
    }
  }

  private isDate(date: any) {
    const parsedDate = Date.parse(date);
    alert(parsedDate);
    if (
      !date ||
      date === null ||
      date === "" ||
      (isNaN(date) && !isNaN(parsedDate))
    ) {
      alert("valid date");
    } else {
      alert("not valid date");
    }
  }

  setImage(src: string): string {
    return this._azureService.getResourceUrlComplete(src);
  }

  async onChageFile(event: any, control: string) {
    if (event) {
      const { target } = event;
      const file = target.files[0];
      const blob = new Blob([file], { type: file.type });
      this.filesLoading[`${control}`] = true;
      try {
        const response = await this._azureService.uploadFile(blob, file.name);
        this.formGroup.get(control).setValue(response.uuidFileName);
      } catch (e) {}
      this.filesLoading[`${control}`] = false;
    } else {
      this.formGroup.get(control).setValue("");
    }
  }

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
    this.isLoading = true;
    //if (this.form.valid) {
    this.actaData.grupos.forEach((grupo, j) => {
      //if (indexGroup === j) {
      //this.groups[j] = false;
      //}

      grupo.parametros.forEach((parametro, k) => {
        parametro.idActividadFormato = Number(this.idActa);
        if (parametro.activo) {
          if (
            parametro.idParametro === TipoParametro.IMAGEN ||
            parametro.idParametro === TipoParametro.UPLOAD ||
            parametro.idParametro === TipoParametro.FIRMA
          ) {
            this.checkImgParam(parametro, j, k);
          }
          // else if (parametro.idParametro === TipoParametro.FIRMA) {
          //   //this.checkSignParam(paramIdx, parametro, indexGroup, k, j);
          // }
          else if (parametro.idParametro === TipoParametro.FECHA) {
            parametro.valor = this.formGroup.get(
              this.getParametroControl({ j, k })
            ).value;
          } else {
            parametro.valor = String(
              this.formGroup.get(this.getParametroControl({ j, k })).value
            );
          }
          // else if (parametro.idParametro !== TipoParametro.UPLOAD) {
          //   parametro.valor = String(
          //     this.formGroup.get(this.getParametroControl({ j, k })).value
          //   );
          // }
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
          (resp) => {
            this.savingData = false;
            this.isLoading = false;
            this.alert = {
              type: "success",
              message: `Acta de conformidad ha sido guardada correctamente!`,
            };
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
    e.preventDefault();
  }

  checkImgParam(parametro, j, k): void {
    parametro.valor = String(
      this.formGroup.get(this.getParametroControl({ j, k })).value
    );
    if (
      !parametro.valor ||
      parametro.valor === "" ||
      parametro.valor === "null"
    ) {
      if (parametro.dato) {
        this.formGroup
          .get(this.getParametroControl({ j, k }))
          .setValue(parametro.dato);
      } else {
        this.formGroup
          .get(this.getParametroControl({ j, k }))
          .setValue(undefined);
      }
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

  printPdf(): void {
    this.loadingReport = true;
    fetch(environment.apiUrl + "/Reportes/GenerarActa/" + this.idActa)
      .then((resp) => resp.blob())
      .then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = this.actaData.nombre + ".pdf";
        this.loadingReport = false;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }
}
