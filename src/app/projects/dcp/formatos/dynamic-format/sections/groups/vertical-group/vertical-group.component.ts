import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { EditarFormatoService } from "app/projects/dcp/formatos/editar-formato/editar-formato.service";
import { GeneralParams } from "app/shared/models/formatos";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { SectionsComponent } from "../../sections.component";

@Component({
  selector: "app-vertical-group",
  templateUrl: "./vertical-group.component.html",
  styleUrls: ["./vertical-group.component.scss"],
})
export class VerticalGroupComponent implements OnInit {
  @Input() groupData: any;
  isLoading: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _editarFormatoService: EditarFormatoService,
    private _groups: SectionsComponent
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.groupData = changes.groupData.currentValue;
    const activeParams = this.groupData.parametros.filter((x) => x.activo);
    this.groupData = { ...this.groupData, parametros: activeParams };
  }

  async postParam() {
    this.isLoading = true;
    let column: number;
    let row: number;
    let paramProps: any;

    const rows = await this.groupData.parametros
      .filter((data) => data.activo)
      .map((data) => data.fila);
    const highestRow = Math.max.apply(null, rows);
    row = highestRow + 1;
    const count = this.groupData.parametros.map((x) => x.activo);
    const textLength = count.length + 1;

    if (this.groupData.parametros && this.groupData.parametros.length === 0) {
      row = 1;
      column = 1;
      paramProps = [
        {
          ...GeneralParams,
          label: "texto " + textLength,
          fila: row,
          columna: column,
          idGrupo: this.groupData.id,
        },
      ];
    } else {
      paramProps = [
        {
          ...this.groupData.parametros[highestRow - 1],
          id: 0,
          fila: row,
        },
      ];
    }
    this._editarFormatoService
      .createDato({
        ...this.groupData,
        parametros: paramProps,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._groups.loadGrupos();
        this.isLoading = false;
      });
  }

  async drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.groupData.parametros,
      event.previousIndex,
      event.currentIndex
    );

    await this.groupData.parametros.map((x, idx) => {
      x.fila = idx + 1;
    });

    this._editarFormatoService
      .createDato({
        ...this.groupData,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {});
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
