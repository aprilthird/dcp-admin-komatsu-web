import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { EditarFormatoService } from "app/projects/dcp/formatos/editar-formato/editar-formato.service";
import { ParamI } from "app/shared/models/formatos";
import { paramsInfo } from "app/shared/utils/dynamic-formats";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ActaConformidadComponent } from "../acta-conformidad.component";

@Component({
  selector: "app-managable-fields",
  templateUrl: "./managable-fields.component.html",
  styleUrls: ["./managable-fields.component.scss"],
})
export class ManagableFieldsComponent implements OnInit {
  @Input() paramData: ParamI;

  fieldData = new FormControl("", Validators.required);
  isLoading: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  filesLoading: boolean;
  edit: boolean;
  @ViewChild("nameInput") el: ElementRef;
  delete: any;
  editLabelField: {
    [key: string]: boolean;
  } = {};

  constructor(
    private _editarFormatoService: EditarFormatoService,
    private _dialog: MatDialog,
    private _actaConformidadComponent: ActaConformidadComponent
  ) {}

  ngOnInit(): void {}

  editField(type: number): void {
    this.isLoading = true;
    this._editarFormatoService
      .createDato({
        parametros: [
          {
            ...this.paramData,
            ...paramsInfo(type, this.paramData),
          },
        ],
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._actaConformidadComponent.getDataActa();
        this.isLoading = false;
      });
  }

  saveLabeOutPut(label: string, type: number): void {
    this.paramData.label = label;
    this.editField(type);
    this.edit = !this.edit;
  }

  setPlaceholcer(value: string): void {
    this.paramData = {
      ...this.paramData,
      placeholder: value,
    };
    this.editField(this.paramData.idParametro);
  }

  setLabel(value: string): void {
    this.paramData = {
      ...this.paramData,
      label: value,
    };
    this.editField(this.paramData.idParametro);
  }

  setAttribute(value: boolean, attribute: string): void {
    this.paramData = {
      ...this.paramData,
      [attribute]: value,
    };
    this.editField(this.paramData.idParametro);
  }

  deleteParam(): void {
    this.paramData = { ...this.paramData, activo: false };
    this.editField(this.paramData.idParametro);
  }
}
