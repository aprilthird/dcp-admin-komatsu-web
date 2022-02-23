import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from "@angular/core";
import { EditarFormatoService } from "app/projects/dcp/formatos/editar-formato/editar-formato.service";
import { GeneralParams } from "app/shared/models/formatos";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { SectionsComponent } from "../../sections.component";

@Component({
  selector: "app-horizontal-group",
  templateUrl: "./horizontal-group.component.html",
  styleUrls: ["./horizontal-group.component.scss"],
})
export class HorizontalGroupComponent implements OnInit, AfterViewInit {
  @Input() groupData: any;
  @Output() currentGroupTouched = new EventEmitter(null);
  @Output() isColumnAdded: EventEmitter<boolean> = new EventEmitter(false);
  lowestRow: number;
  lowestColumn: number;
  highestColumn: number;
  isLoading: boolean;
  rowsOfGrid = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  highestRow: any;
  @ViewChildren(`scrollend`) scrollFrame: QueryList<HTMLElement>;

  constructor(
    private _editarFormatoService: EditarFormatoService,
    private _groups: SectionsComponent
  ) {}

  ngOnInit(): void {
    this.createGrid();
    this.firstColumnRow();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.groupData = changes.groupData.currentValue;
  }

  ngAfterViewInit(): void {}

  firstColumnRow(): void {
    const columns = this.groupData.parametros
      .filter((data) => data.activo)
      .map((x) => x.columna);
    const rows = this.groupData.parametros
      .filter((data) => data.activo)
      .map((x) => x.fila);
    this.lowestRow = Math.min.apply(null, rows);
    this.lowestColumn = Math.min.apply(null, columns);
    this.highestColumn = Math.max.apply(null, columns);
    this.highestRow = Math.max.apply(null, rows);
  }

  async addColumn() {
    this.isColumnAdded.emit(true);
    this.currentGroupTouched.emit(this.groupData.id);
    this.isLoading = true;
    const columns = [...this.groupData.parametros].map((data) => data.columna);
    //const highestColumn = Math.max.apply(null, columns);

    /**for actives */
    const columnsActive = [...this.groupData.parametros]
      .filter((data) => data.activo)
      .map((x) => x.columna);
    const highestColumnActive = Math.max.apply(null, columnsActive);
    /**for actives */
    let lastColumn = [];

    [...this.groupData.parametros].map((data) => {
      if (data.columna === highestColumnActive && data.activo)
        lastColumn.push(data);
    });

    const newColumn = await lastColumn.map((x) => {
      return {
        ...GeneralParams,
        columna: highestColumnActive + 1,
        fila: x.fila,
        idGrupo: x.idGrupo,
        idParametro: x.idParametro,
        label: x.label,
        placeholder: x.placeholder,
        dato: x.dato,
        editable: x.editable,
        visible: x.visible,
        obligatorio: x.obligatorio,
      };
    });

    this._editarFormatoService
      .createDato({
        ...this.groupData,
        parametros: newColumn,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._groups.loadGrupos();
        this.isLoading = false;
      });
  }

  async addRow() {
    this.isColumnAdded.emit(false);
    this.isLoading = true;
    const rows = await this.groupData.parametros.map((data) => data.fila);
    //const highestRow = Math.max.apply(null, rows);
    const newRow = [...this.rowsOfGrid[this.rowsOfGrid.length - 1]].map((x) => {
      return {
        ...GeneralParams,
        columna: x.columna,
        fila: this.highestRow + 1,
        idGrupo: x.idGrupo,
        idParametro: x.idParametro,
        label: x.label,
        placeholder: x.placeholder,
        dato: x.dato,
        editable: x.editable,
        visible: x.visible,
        obligatorio: x.obligatorio,
      };
    });

    this._editarFormatoService
      .createDato({
        ...this.groupData,
        parametros: newRow,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._groups.loadGrupos();
        this.isLoading = false;
      });
  }

  activeRows(): boolean {
    return this.groupData.parametros.some((x) => x.activo);
  }

  private createGrid(): void {
    let rawData = [];
    this.getAllParameters().map((x: any) => {
      if (x) rawData.push(x.fila);
    });
    const allRowsInTable = rawData.filter(
      (value, index, x) => x.indexOf(value) === index
    );

    if (allRowsInTable.length > 0) {
      allRowsInTable.forEach((x) => {
        this.rowsOfGrid.push(
          [...this.groupData.parametros].filter(
            (param) => param.fila === x && param.activo
          )
        );
      });
    }
  }
  private getAllParameters(): number[] {
    let activeParams = [];
    this.groupData.parametros.forEach((x) => {
      if (x.columna && x.activo) activeParams.push(x);
    });

    return activeParams;
  }

  async addParam() {
    this.isColumnAdded.emit(false);
    this.isLoading = true;

    this._editarFormatoService
      .createDato({
        ...this.groupData,
        parametros: [
          {
            ...GeneralParams,
            fila: 1,
            columna: 1,
          },
        ],
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._groups.loadGrupos();
        this.isLoading = false;
      });
  }

  delete(position: number, type: string): void {
    let positionType;
    if (type === "row") {
      this.isColumnAdded.emit(false);
      positionType = "fila";
    } else {
      this.isColumnAdded.emit(true);
      positionType = "columna";
    }
    this.isLoading = true;
    const posToDelete = this.groupData.parametros.filter((x) => {
      if (x[positionType] === position) {
        x.activo = false;
        return x;
      }
    });
    this._editarFormatoService
      .createDato({
        ...this.groupData,
        parametros: posToDelete,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.isLoading = false;
        this._groups.loadGrupos();
      });
  }

  /**PROBANDO ELIMINACION DE COLUMNAS Y RESTAR UNA POSICIÓN A LAS SIGUIENTES COLUMNAS */
  deleteTMP(position: number, type: string): void {
    let positionType;
    if (type === "row") {
      this.isColumnAdded.emit(false);
      positionType = "fila";
    } else {
      this.isColumnAdded.emit(true);
      positionType = "columna";
    }
    this.isLoading = true;
    const posToDelete = this.groupData.parametros.filter((x) => {
      if (x[positionType] === position) {
        x.activo = false;
        return x;
      }
    });

    this._editarFormatoService
      .createDato({
        ...this.groupData,
        parametros: posToDelete,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        const itineraions =
          (positionType === "columna" ? this.highestColumn : this.highestRow) -
          position;

        if (itineraions === 0) {
          this.isLoading = false;
          this._groups.loadGrupos();
        } else {
          for (let i = 0; i < itineraions; i++) {
            setTimeout(() => {
              let elementToMove = this.groupData.parametros.filter(
                (y) => y[positionType] === position + i + 1 && y.activo
              );
              elementToMove.map((x) => (x[positionType] = x[positionType] - 1));

              this._editarFormatoService
                .createDato({
                  ...this.groupData,
                  parametros: elementToMove,
                })
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                  if (
                    (positionType === "columna"
                      ? this.highestColumn
                      : this.highestRow) -
                      position ===
                    i + 1
                  ) {
                    this.isLoading = false;
                    this._groups.loadGrupos();
                  }
                });
            }, i * 2000);
          }
        }
      });
  }
}
