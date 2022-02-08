import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
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
  @Output() outputData = new EventEmitter();

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

  @HostListener("click", ["$event.target"])
  onClick(classname) {
    const className = (classname as Element).className;
    if (
      className ===
        "mat-tooltip-trigger text-gray-900 font-medium cursor-pointer ng-star-inserted" ||
      className === "label-edit cursor-pointer ng-star-inserted" ||
      className === "label-edit cursor-pointer"
    ) {
      this.editLabelFn();
    }
  }

  @HostListener("keypress", ["$event.target"])
  keyPress(classname) {
    const classNameKeypress = (classname as Element).className;
    if (
      classNameKeypress.includes(
        "mat-input-element mat-form-field-autofill-control auto-save-field"
      )
    ) {
      this.sendOutPut();
    }
  }

  ngOnInit(): void {
    this.validateRegex();
  }

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

  saveLabelFn(): void {
    this.editField(this.paramData.idParametro);
    this.edit = !this.edit;
  }
  editLabelFn(): void {
    this.edit = true;
    setTimeout(() => {
      this.el.nativeElement.select();
    });
  }

  sendOutPut(): void {
    setTimeout(() => {
      this.outputData.emit({ ...this.paramData, valor: this.fieldData.value });
    });
  }

  validateRegex(): void {
    this.fieldData.setValue(JSON.stringify(this.paramData.valor));
    this.paramData.editable
      ? this.fieldData.enable()
      : this.fieldData.disable();

    this.fieldData.setValidators([
      this.paramData.obligatorio
        ? Validators.required
        : Validators.nullValidator,
      Validators.minLength(this.paramData.minCaracteres),
      Validators.maxLength(this.paramData.maxCaracteres),
    ]);
  }
}
