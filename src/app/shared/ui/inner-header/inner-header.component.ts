import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { UsuariosService } from "app/projects/dcp/ajustes/usuarios/usuario.service";
import { BahiasService } from "app/projects/dcp/maestros/bahias/bahias.service";
import { ClaseActividadService } from "app/projects/dcp/maestros/clase-actividad/clase-actividad.service";
import { DocumentosService } from "app/projects/dcp/maestros/documentos/documentos.service";
import { EquiposService } from "app/projects/dcp/maestros/equipos/equipos.service";
import { FlotasService } from "app/projects/dcp/maestros/flotas/flotas.service";
import { MaestrosService } from "app/projects/dcp/maestros/maestros.service";
import { ModelosService } from "app/projects/dcp/maestros/modelos/modelos.service";
import { TipoEquiposService } from "app/projects/dcp/maestros/tipo-equipos/tipo-equipos.service";
import { SharedService } from "app/shared/shared.service";
import { ExportExcelService } from "app/shared/utils/export-excel.ts.service";
import { Subject } from "rxjs";
import { debounceTime, map, switchMap, takeUntil } from "rxjs/operators";

@Component({
  selector: "shared-inner-header",
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
    private exportExcelService: ExportExcelService,
    private shared: SharedService,
    private docs: DocumentosService
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
    this.shared.currentTableData.subscribe((data) => {
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

      case "documentos":
        return this.docs.getDocumentos({ nombre: query });

      case "usuarios":
        return this._usuariosService.getUsuarios({ nombre: query });

      default:
        return [];
    }
  }
}
