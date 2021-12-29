import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { DialogAddCommentComponent } from "../components/dialog-add-comment/dialog-add-comment.component";
import { DialogValidateFormatComponent } from "../components/dialog-validate-format/dialog-validate-format.component";
import { ActivatedRoute } from "@angular/router";

//SERVICES

import { ActivityFake } from "../../fake-db/activities/activity-fake-db";
import { EditarFormatoService } from "../editar-formato/editar-formato.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { TipoParametro } from "app/core/types/formatos.types";
import { MatCheckbox } from "@angular/material/checkbox";
import { AzureService } from "app/core/azure/azure.service";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { FormatosService } from "../formatos.service";
import { UiDialogsComponent } from "app/shared/ui/ui-dialogs/ui-dialogs.component";
import { ActivitiesService } from "../../actividades/activities.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-validation-formatos",
  templateUrl: "./validation-formatos.component.html",
  styleUrls: ["./validation-formatos.component.scss"],
})
export class ValidationFormatosComponent implements OnInit {
  currentSeccion: string;
  drawerMode: "side" | "over";
  drawerOpened: boolean;
  menuData: any[];
  commented: boolean;
  currentIdAsignation: any;
  currentActivity: ActivityFake;
  sectionSelected: any;
  sections: any[] = [];

  form: FormGroup = this.fb.group({});
  currentSeccionId: any;
  currentSectionData: any;

  observation: {
    [key: string]: boolean;
  } = {};

  editGroup: {
    [key: string]: boolean;
  } = {};

  groups: {
    [key: string]: boolean;
  } = {};

  filesLoading: {
    [key: string]: boolean;
  } = {};
  data: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isNotValidationButtonAble: boolean = true;
  allSectionValidates = [];

  constructor(
    private matDialog: MatDialog,
    private routerActive: ActivatedRoute,
    private asignationService: EditarFormatoService,
    private fb: FormBuilder,
    private _azureService: AzureService,
    private _editarFormatoService: EditarFormatoService,

    private formatosService: FormatosService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _activitiesService: ActivitiesService
  ) {
    this.getAsignationId();

    //this.setCollapsableNav();
  }

  ngOnInit(): void {
    this.drawerMode = "side";
    this.drawerOpened = true;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private getAsignationId(): void {
    this.routerActive.paramMap.subscribe((params: any) => {
      this.currentIdAsignation = params.params["id"];
      this.currentSeccionId = params.params["section"];
      this._activitiesService._idFormat.next(Number(this.currentIdAsignation));
      this.getAsignation();
    });
  }

  private async getAsignation() {
    this.asignationService
      .getAbrirAsignacion(this.currentIdAsignation)
      .subscribe(async (resp) => {
        this.sections = await resp.body.secciones;

        if (this.currentSeccionId) {
          this.currentSectionData = await [...this.sections].find(
            (section: any) => Number(this.currentSeccionId) === section.id
          );
          this.generateForm();
        }
      });
  }

  private setCollapsableNav(): void {
    this.menuData = [
      {
        id: "secciones",
        title: "Secciones",
        type: "group",
        children: [],
      },
    ];

    this.sections.forEach((section) => {
      this.allSectionValidates = [];
      this.allSectionValidates.push(
        section.grupos[0].parametros.some(
          (parametro) => parametro.seccionValida
        )
      );

      this.menuData[0].children.push({
        id: section.id,
        title: section.nombre,
        type: "basic",
        link: `/admin/informes/validation/${this.currentIdAsignation}/${section.id}`,
        children: [],
        badge: {
          title:
            !section.grupos[0].parametros.some(
              (parametro) => parametro.seccionValida
            ) && section.grupos.some((group) => group.observado)
              ? "warning_amber"
              : section.grupos[0].parametros.some(
                  (parametro) => parametro.seccionValida
                )
              ? "heroicons_outline:check-circle"
              : "",
          classes: section.grupos.some((group) => group.observado)
            ? "text-yellow-600"
            : "text-green-600",
        },
      });
    });

    this.menuData[0].children.push({
      id: "fotografia",
      title: "Fotografía",
      type: "basic",
      link: `/admin/informes/validation/fotografias/${this.currentIdAsignation}`,
    });

    this.validateFormat();
    this.isNotValidationButtonAble = this.isAllSectionvalid();
  }

  private isAllSectionvalid(): boolean {
    for (let i = 0; i < this.allSectionValidates.length; i++) {
      if (!this.allSectionValidates[i]) return false;
    }
    return true;
  }

  validate(): void {
    const idAsignacionDetalle =
      this.currentSectionData.grupos[0].parametros[0].idAsignacionDetalle;
    const idSeccion = this.currentSectionData.grupos[0].parametros[0].idSeccion;

    const data = {
      idAsignacionDetalle: idAsignacionDetalle,
      idSeccion: idSeccion,
    };
    const dialogRef = this.matDialog.open(DialogValidateFormatComponent, {
      width: "500px",
      data: data,
    });

    dialogRef.componentInstance.success.subscribe((resp) => {
      if (resp.code === 200 && resp.error === 0) {
        this.currentSectionData.grupos[0].parametros[0].seccionValida = true;
        this.validateSection();
        this.setCollapsableNav();
      } else {
        this.matDialog
          .open(UiDialogsComponent, {
            width: "500px",
            data: {
              title: "Error",
              message: resp.message,
            },
          })
          .afterClosed()
          .subscribe(() => this.setCollapsableNav());
      }

      dialogRef.close(close);
    });
  }

  postValidateFormat(): void {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Validación de informe",
      message: "¿Estás seguro que desea validar el informe?",

      actions: {
        confirm: {
          label: "Sí, validar",
          color: "primary",
        },
        cancel: {
          label: "No",
        },
      },
      dismissible: true,
    });

    dialogRef.beforeClosed().subscribe((result) => {
      const data = {
        idAsignacionDetalle:
          this.sections[0].grupos[0].parametros[0].idAsignacionDetalle,
        idFormato: this.sections[0].grupos[0].parametros[0].idFormato,
      };

      if (result === "confirmed") {
        this.formatosService.validateFormat(data).subscribe(() => {
          this.sections[0].grupos[0].parametros[0].formatoValido = true;
        });
      }
    });
  }

  deleteComment(): void {}

  splitOptions(options: string): string[] {
    return options.split(",");
  }

  getParametroControl({ j, k }) {
    return `${j}-${k}`;
  }

  private generateForm() {
    this.currentSectionData.grupos.forEach((grupo, j) => {
      this.observation[`${j}`] = false;
      grupo.parametros.forEach((parametro, k) => {
        if (parametro.activo) {
          if (
            parametro.idParametro === TipoParametro.UPLOAD ||
            parametro.idParametro === TipoParametro.IMAGEN ||
            parametro.idParametro === TipoParametro.FIRMA
          ) {
            this.filesLoading[`${j}-${k}`] = false;
          }
          if (parametro.idParametro === TipoParametro.CHECKBOX) {
            this.form.addControl(
              `${this.getParametroControl({ j, k })}`,
              new FormControl({
                value: parametro.valor === "true" ? true : false,
                disabled: true,
              })
            );
          } else if (parametro.idParametro === TipoParametro.FECHA) {
            this.form.addControl(
              `${this.getParametroControl({ j, k })}`,
              new FormControl({
                value: this.convertDate(parametro.valor),
                disabled: true,
              })
            );
          } else {
            this.form.addControl(
              `${this.getParametroControl({ j, k })}`,
              new FormControl({
                value: parametro.valor,
                disabled: true,
              })
            );
          }

          /**OBSERVE PARAM */
        }
      });
    });
    this.setCollapsableNav();
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

  removeSign(event, groupIdx: number, paramIdx: number): void {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar firma",
      message: "¿Estás seguro que desea eliminar permanentemente la firma?",

      actions: {
        confirm: {
          label: "Sí, eliminar",
          color: "primary",
        },
        cancel: {
          label: "No",
        },
      },
      dismissible: true,
    });

    dialogRef.beforeClosed().subscribe((result) => {
      if (result === "confirmed") {
        this.submit(event, groupIdx, false, paramIdx);
      }
    });
  }

  setImage(src: string): string {
    return this._azureService.getResourceUrlComplete(src);
  }

  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
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

  observateGroup(j: number, event: MatCheckbox) {
    this.observation[j] = event.checked;
  }

  edit(groupIndex: number): void {
    this.currentSectionData.grupos.forEach((grupo, j) => {
      if (j === groupIndex) {
        this.groups[j] = !this.groups[j];
        grupo.parametros.forEach((parametro, k) => {
          this.editGroup[`${j}`] = true;
          if (this.form.controls[`${this.getParametroControl({ j, k })}`]) {
            this.form.get(`${this.getParametroControl({ j, k })}`).enable();
          }
        });
      }
    });
  }

  submit(
    e: MouseEvent,
    indexGroup: number,
    deleteComment?: boolean,
    paramIdx?: number
  ): void {
    //if (this.form.valid) {
    const data = [...this.sections];
    //console.log("this form ", this.form.value);
    data.forEach((seccion, i) => {
      seccion.grupos.forEach((grupo, j) => {
        if (indexGroup === j) {
          this.groups[j] = false;
        }
        if (deleteComment) {
          if (j === indexGroup) {
            grupo.comentarios = null;
          }
        }
        grupo.parametros.forEach((parametro, k) => {
          if (parametro.activo) {
            if (
              parametro.idParametro === TipoParametro.UPLOAD ||
              parametro.idParametro === TipoParametro.IMAGEN
            ) {
              this.checkImgParam(parametro, j, k);
            } else if (parametro.idParametro === TipoParametro.FIRMA) {
              if (parametro.data) {
                this.checkSignParam(paramIdx, parametro, indexGroup, k, j);
              }
            } else {
              console.log("--- ", parametro.activo);
              console.log("--- ", parametro.label);
              //Object.keys(this.form.value).forEach((key) => console.log(key));
              //console.log(this.getParametroControl({ j, k }));
              parametro.valor = String(
                this.form.get(this.getParametroControl({ j, k })).value
              );
            }
          }
        });
      });
    });
    const payload = {
      secciones: data,
      idFormato: data[0].grupos[0].parametros[0].idFormato,
      idActividadFormtao: Number(this.currentIdAsignation),
    };
    this.postAssignation(payload);
    //}
    e.preventDefault();
  }

  checkSignParam(paramIdx, parametro, indexGroup, k, j): void {
    if (paramIdx) {
      if (paramIdx === k && indexGroup === j) {
        parametro.valor = null;
        this.form.get(this.getParametroControl({ j, k })).setValue(null);
      }
    } else {
      console.log("form ", this.form.value);
      if (
        this.form.get(this.getParametroControl({ j, k })).value &&
        this.form.get(this.getParametroControl({ j, k })).value !== ""
      ) {
        parametro.valor = String(
          this.form.get(this.getParametroControl({ j, k })).value
        );
      } else {
        parametro.valor = null;
      }
    }
  }

  checkImgParam(parametro, j, k): void {
    if (parametro.valor === null || parametro.valor === "") {
      this.form
        .get(this.getParametroControl({ j, k }))
        .setValue(parametro.dato);
    }
    parametro.valor = String(
      this.form.get(this.getParametroControl({ j, k })).value
    );
  }

  postAssignation(payload): void {
    this._editarFormatoService.saveAssignation(payload).subscribe(() => {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key).disable();
      });
    });
  }

  validateSection(): boolean {
    return this.currentSectionData.grupos[0].parametros.some(
      (parametro) => parametro.seccionValida
    );
  }

  /*validateAllSection() {
    this.sections.forEach((section) => {
      section.grupos.forEach((group) => {
        group.parametros.forEach((parameter) => {
          if (!parameter.seccionValida) {
            this.allSectionValidated = false;
          }
        });
      });
    });
  }*/

  isSectionObserved(): boolean {
    return this.currentSectionData.grupos.some((group) => group.observado);
  }

  isGroupObserved(groupIdx: number): boolean {
    return this.currentSectionData.grupos[groupIdx].observado;
  }

  validateFormat() {
    for (let i = 0; i < this.sections.length; i++) {
      for (let j = 0; j < this.sections[i].grupos[0].parametros.length; j++) {
        if (this.sections[i].grupos[0].parametros[j].formatoValido) {
          return true;
        }
      }
    }
    return false;
  }

  cancelEdit(j): void {
    this.groups[j] = false;
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key).disable();
    });
  }

  addComment(groupIdx: number): void {
    const data = {
      data: this.sections,
      groupIndex: groupIdx,
      sectionId: this.currentSeccionId,
      idFormato: this.sections[0].grupos[0].parametros[0].idFormato,
    };
    this.matDialog.open(DialogAddCommentComponent, {
      width: "500px",
      data: data,
    });
  }

  editable(j): boolean {
    return this.groups[`${j}`];
  }
}
