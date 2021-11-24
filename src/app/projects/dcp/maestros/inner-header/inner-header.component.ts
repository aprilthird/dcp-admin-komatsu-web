import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { debounceTime, map, switchMap, takeUntil } from "rxjs/operators";
import { BahiasService } from "../bahias/bahias.service";
import { ClaseActividadService } from "../clase-actividad/clase-actividad.service";
import { EquiposService } from "../equipos/equipos.service";
import { FlotasService } from "../flotas/flotas.service";
import { ModelosService } from "../modelos/modelos.service";
import { TipoEquiposService } from "../tipo-equipos/tipo-equipos.service";
import { ExportExcelService } from "app/shared/utils/export-excel.ts.service";
import { MaestrosService } from "../maestros.service";
import { UsuariosService } from "../../ajustes/usuarios/usuario.service";
import { DocumentosService } from "../documentos/documentos.service";

@Component({
  selector: "app-inner-header",
  templateUrl: "./inner-header.component.html",
  styleUrls: ["./inner-header.component.scss"],
})
export class InnerHeaderComponent implements OnInit {
  @Output() text: EventEmitter<string> = new EventEmitter(null);
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter(null);
  @Input() type: string;
  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  selectedUser = null;
  currentTableData: any[];

  constructor(
    private cliente: MaestrosService,
    private _usuariosService: UsuariosService,
    private bahia: BahiasService,
    private equipo: EquiposService,
    private claseActividadService: ClaseActividadService,
    private flotasService: FlotasService,
    private modelosService: ModelosService,
    private tipoEquiposService: TipoEquiposService,
    private documentoService: DocumentosService,
    private exportExcelService: ExportExcelService
  ) {}

  ngOnInit(): void {
    this.searchFilter();
    this.getCurrentTableData();
  }
  filterByQuery(e): void {}

  searchFilter(): void {
    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          //this.closeDetails();
          this.isLoading.emit(true);
          return this.setFilterData(this.type, query);
        }),
        map(() => {
          this.isLoading.emit(false);
        })
      )
      .subscribe();
  }

  private getCurrentTableData(): void {
    this.cliente.currentTableData$.subscribe((data) => {
      this.currentTableData = data;
    });
  }

  exportToExcel(): void {
    this.exportExcelService.exportAsExcelFile(this.currentTableData, "data");
  }

  setFilterData(param, query) {
    switch (param) {
      case "clientes":
        return this.cliente.getClients({ nombre: query });
      case "equipos":
        return this.equipo.getEquipos({ nombre: query });
      case "bahias":
        return this.bahia.getBahias({ nombre: query });

      case "tipos_equipos":
        return this.tipoEquiposService.getTipoEquipos({ nombre: query });
      case "modelos":
        return this.modelosService.getModelos({ nombre: query });
      case "flotas":
        return this.flotasService.getFlotas({ nombre: query });

      case "clase_actividades":
        return this.claseActividadService.getClaseActividad({ nombre: query });

      case "usuarios":
        return this._usuariosService.getUsuarios({ nombre: query });

      case "documentos":
        return this.documentoService.getDocumentos({ nombre: query });

      default:
        return [];
    }
  }
}
