import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { EditarFormatoService } from "../../../editar-formato/editar-formato.service";
import { SectionsComponent } from "../sections.component";
import { HorizontalGroupComponent } from "./horizontal-group/horizontal-group.component";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.scss"],
})
export class GroupsComponent implements OnInit {
  @Input() groupData: any;
  @Input() isActa: boolean;
  @Output() currentGroupused = new EventEmitter(null);
  @Output() isColumnAdded = new EventEmitter(null);
  isLoading: boolean;
  rowsOfGrid = [];
  edit: boolean;
  @ViewChild("nameInput") el: ElementRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChildren(HorizontalGroupComponent) myValue: HorizontalGroupComponent;

  constructor(
    private _editFormat: EditarFormatoService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _groups: SectionsComponent
  ) {}

  ngOnInit(): void {}

  deleteGroup(): void {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar Grupo",
      message: "¿Estás seguro que deseas eliminar este Grupo?",
      icon: {
        name: "heroicons_outline:trash",
      },
      actions: {
        confirm: {
          label: "Sí, eliminar",
        },
        cancel: {
          label: "No",
        },
      },
      dismissible: true,
    });

    dialogRef.beforeClosed().subscribe((result) => {
      if (result === "confirmed") {
        this.isLoading = true;
        this._editFormat
          .createGrupo({
            ...this.groupData,
            activo: false,
          })
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
            this._groups.loadGrupos();
          });
      }
    });
  }

  editGroup(): void {
    this.edit = true;
    setTimeout(() => {
      this.el.nativeElement.select();
    });
  }

  save(): void {
    this._editFormat
      .createGrupo({
        ...this.groupData,
        nombre: this.el.nativeElement.value,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.edit = false;
        this.groupData.nombre = this.el.nativeElement.value;
        this._groups.loadGrupos();
      });
  }

  currentGroupTouched(event): void {
    this.currentGroupused.emit(event);
  }

  isColumnAddedFn(event): void {
    setTimeout(() => {
      this.isColumnAdded.emit(event);
    });
  }
}
