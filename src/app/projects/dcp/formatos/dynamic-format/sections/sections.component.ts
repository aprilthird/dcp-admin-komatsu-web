import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { I } from "@angular/cdk/keycodes";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { GroupI } from "app/shared/models/formatos";
import { Observable, Subject } from "rxjs";
import { EditarFormatoService } from "../../editar-formato/editar-formato.service";
import { FormatosService } from "../../formatos.service";
import { GroupsComponent } from "./groups/groups.component";
import { HorizontalGroupComponent } from "./groups/horizontal-group/horizontal-group.component";

@Component({
  selector: "app-sections",
  templateUrl: "./sections.component.html",
  styleUrls: ["./sections.component.scss"],
})
export class SectionsComponent implements OnInit, AfterViewInit {
  @Input() sectionData: any;
  @Input() isActa: boolean;
  isLoading: boolean;
  sections$: Observable<any>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  grupos: any[] = [];
  edit: boolean;
  @ViewChild("nameInput") el: ElementRef;

  @ViewChild("scrollend") scrollFrame: ElementRef<any>;
  private scrollContainer: any;

  @ViewChildren(GroupsComponent) myValue: GroupsComponent;

  constructor(
    private _editarFormatoService: EditarFormatoService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _formatService: FormatosService
  ) {}

  ngOnInit(): void {
    this.loadGrupos();
  }

  ngOnDestry(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngAfterViewInit(): void {
    // if (this.scrollFrame) {
    //   this.scrollContainer = this.scrollFrame.nativeElement;
    // }

    console.log("sections ", this.myValue);
  }

  postGroup(pos?: string): void {
    const long = this.grupos.length + 1;
    this._editarFormatoService
      .createGrupo({
        id: 0,
        idFormato: this._formatService._idFormulario.getValue(),
        idSeccion: this.sectionData.id,
        parametros: [],
        pos: pos,
        //nombre: "Grupo " + long,
        nombre: "Nuevo Grupo",
        activo: true,
      })
      .subscribe(() => {
        this.loadGrupos();
      });
  }

  public loadGrupos() {
    this.isLoading = true;
    //this.grupos = [];
    this.isLoading = true;
    this._editarFormatoService
      .getGrupos(this.sectionData.id)
      .subscribe((response) => {
        this.isLoading = false;
        this.grupos = response.body;
        if (this.grupos.length === 0 && this.isActa) {
          this.postGroup("v");
        }
        console.log("myValue sections ", this.myValue);
        if (this.scrollContainer) {
          this.scrollContainer = this.scrollFrame.nativeElement;
          console.log(this.scrollContainer);
          this.scrollContainer.scroll({
            left: 500,
            behavior: "auto",
          });
        }
      });

    this.isLoading = false;
  }

  editSection(): void {
    this.edit = true;
    setTimeout(() => {
      this.el.nativeElement.select();
    });
  }
  save(): void {
    this._editarFormatoService
      .createSeccion(
        {
          ...this.sectionData,
          nombre: this.el.nativeElement.value,
        },
        false
      )
      .subscribe(() => {
        this.edit = false;
        this.sectionData.nombre = this.el.nativeElement.value;
        this.loadGrupos();
      });
  }

  deleteSection(): void {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar Sección",
      message: "¿Estás seguro que deseas eliminar ésta Sección?",
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
        this._editarFormatoService
          .createSeccion(
            {
              ...this.sectionData,
              activo: false,
            },
            true
          )
          .subscribe(() => {
            this.loadGrupos();
          });
      }
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.grupos, event.previousIndex, event.currentIndex);
  }

  trackByFn(index: number, item: GroupI): number {
    return item.id;
  }

  isActiveGroup(): boolean {
    return this.grupos.some((x) => x.activo);
  }
}
