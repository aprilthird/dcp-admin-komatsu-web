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

  constructor(
    private matDialog: MatDialog,
    private routerActive: ActivatedRoute,
    private asignationService: EditarFormatoService,
    private fb: FormBuilder,
    private _azureService: AzureService,
    private _editarFormatoService: EditarFormatoService,

    private formatosService: FormatosService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.getAsignationId();

    //this.setCollapsableNav();
  }

  ngOnInit(): void {
    this.drawerMode = "side";
    this.drawerOpened = true;
  }

  private getAsignationId(): void {
    this.routerActive.paramMap.subscribe((params: any) => {
      this.currentIdAsignation = params.params["id"];
      this.currentSeccionId = params.params["section"];
      this.getAsignation();
    });
  }

  private async getAsignation() {
    this.asignationService
      .getAbrirAsignacion(this.currentIdAsignation)
      .subscribe(async (resp) => {
        console.log("asignation ", resp);
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

    this.sections.forEach((section, index) => {
      this.menuData[0].children.push({
        id: section.id,
        title: section.nombre,
        type: "basic",
        link: `/admin/informes/validation/${this.currentIdAsignation}/${section.id}`,
        children: [],
      });
    });

    this.menuData[0].children.push({
      id: "fotografia",
      title: "Fotografía",
      type: "basic",
      link: `/admin/informes/validation/fotografias`,
    });
  }

  validate(): void {
    const idAsignacionDetalle =
      this.currentSectionData.grupos[0].parametros[0].idAsignacionDetalle;
    const idSeccion = this.currentSectionData.grupos[0].parametros[0].idSeccion;

    const data = {
      idAsignacionDetalle: idAsignacionDetalle,
      idSeccion: idSeccion,
    };
    this.matDialog.open(DialogValidateFormatComponent, {
      width: "500px",
      data: data,
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

      console.log(result);
      if (result === "confirmed") {
        this.formatosService.validateFormat(data).subscribe(() => {});
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
          this.form.get(`${this.getParametroControl({ j, k })}`).enable();
        });
      }
    });
  }

  submit(e: MouseEvent, indexGroup, deleteComment?: boolean): void {
    //if (this.form.valid) {
    const data = [...this.sections];

    data.forEach((seccion, i) => {
      seccion.grupos.forEach((grupo, j) => {
        this.groups[j] = !this.groups[j];

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
              if (parametro.valor === null || parametro.valor === "") {
                this.form
                  .get(this.getParametroControl({ j, k }))
                  .setValue(parametro.dato);
              }
            }

            /*if (parametro.idParametro === TipoParametro.FECHA) {
                
                this.form
                  .get(this.getParametroControl({ i, j, k }))
                  .setValue(new Date(parametro.valor).getTimezoneOffset());
              }*/
            parametro.valor = String(
              this.form.get(this.getParametroControl({ j, k })).value
            );
          }
        });
      });
    });
    const payload = {
      secciones: data,
      idFormato: data[0].grupos[0].parametros[0].idFormato,
    };
    this._editarFormatoService.saveAssignation(payload).subscribe(() => {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key).disable();
      });
    });
    //}
    e.preventDefault();
  }

  validateSection(): boolean {
    if (this.currentSectionData.grupos[0].parametros.length > 0) {
      return this.currentSectionData.grupos[0].parametros[0].seccionValida;
    }
    return false;
  }

  validateFormat(): boolean {
    if (this.currentSectionData.grupos[0].parametros.length > 0) {
      return this.currentSectionData.grupos[0].parametros[0].formatoValido;
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
