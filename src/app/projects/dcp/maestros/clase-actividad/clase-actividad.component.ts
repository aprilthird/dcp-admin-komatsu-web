import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { PermissionService } from "app/core/permission/permission.service";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ClaseActividadI } from "./clase-actividad-model";
import { ClaseActividadService } from "./clase-actividad.service";
import { DialogAddClaseActividadComponent } from "./dialog-add-clase-actividad/dialog-add-clase-actividad.component";
import { DialogAddTipoMtmtoComponent } from "./dialog-add-tipo-mtmto/dialog-add-tipo-mtmto.component";

@Component({
  selector: "app-clase-actividad",
  templateUrl: "./clase-actividad.component.html",
  styleUrls: ["./clase-actividad.component.scss"],
})
export class ClaseActividadComponent implements OnInit {
  isLoading = true;
  selectedActivity: any;

  clase_actividades$: Observable<ClaseActividadI[]>;

  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  tipoMttos: any[] = [];
  idClaseActv: any;

  constructor(
    public _permissonService: PermissionService,
    private _routeActived: ActivatedRoute,
    private _router: Router,
    private matDialog: MatDialog,
    private claseActividadService: ClaseActividadService
  ) {
    this.getClaseActividades();
  }

  ngOnInit(): void {
    this.loadData();
  }

  getClaseActividades(): void {
    this.clase_actividades$ =
      this.claseActividadService.clase_actividades$.pipe(
        takeUntil(this._unsubscribeAll)
      );

    this.pagination$ = this.claseActividadService.pagination$;
  }

  loadData() {
    this.isLoading = true;
    this.claseActividadService
      .getClaseActividad(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  setLoading(loading): void {
    this.isLoading = loading;
  }

  changePage(pagination: any): void {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.onSameUrlNavigation = "reload";

    const params = this._routeActived.snapshot.params;
    this._router.navigate(["/admin/maestros/clase_actividades"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }

  deleteClaseActividad(): void {}

  createClaseActividad(): void {
    this.matDialog.open(DialogAddClaseActividadComponent, {
      width: "400px",
      maxHeight: "100vh",
    });
  }

  toggleDetails(actividad): void {
    this.tipoMttos = [];
    this.idClaseActv = actividad.id;
    this.claseActividadService
      .getTipoMantenimiento(actividad.id)
      .subscribe((tipoMttos) => {
        console.log(tipoMttos);
        this.tipoMttos = tipoMttos.body.data;
      });
    console.log(this.selectedActivity);
    if (
      this.selectedActivity &&
      this.selectedActivity.nombre === actividad.nombre
    ) {
      this.selectedActivity = null;
      return;
    }
    this.selectedActivity = actividad;
  }

  createTipoMantenimeinto(): void {
    this.matDialog
      .open(DialogAddTipoMtmtoComponent, {
        width: "400px",
        maxHeight: "100vh",
        data: { idClase: this.idClaseActv },
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  edit(equipo): void {
    this.matDialog
      .open(DialogAddClaseActividadComponent, {
        width: "400px",
        data: equipo,
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }
}
