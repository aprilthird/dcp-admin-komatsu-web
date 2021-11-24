import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DialogPrevisualizarComponent } from "../components/dialog-previsualizar/dialog-previsualizar.component";
import { AperturaAsignacionComponent } from "./apertura-asignacion/apertura-asignacion.component";
import { ListadoAsignacionesService } from "./asignaciones.service";

@Component({
  selector: "app-asignaciones",
  templateUrl: "./asignaciones.component.html",
  styleUrls: ["./asignaciones.component.scss"],
})
export class AsignacionesComponent implements OnInit {
  isLoading = true;

  asignaciones$: Observable<any[]>;
  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private _routeActived: ActivatedRoute,
    private _listadoAsignacionesService: ListadoAsignacionesService,
    public _matDialog: MatDialog
  ) {
    this.asignaciones$ = this._listadoAsignacionesService.asignaciones$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this._listadoAsignacionesService.pagination$;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this._listadoAsignacionesService
      .getAsignaciones(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  changePage(pagination: any) {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.onSameUrlNavigation = "reload";

    const params = this._routeActived.snapshot.params;
    this._router.navigate(["/admin/formatos/asignaciones"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }

  clickEditAsignacion(idAsignacion) {
    //const dialogRef = this._matDialog.open(DialogPrevisualizarComponent);
    //dialogRef.componentInstance.id = idAsignacion;
    //dialogRef.componentInstance.isAsignacion = true;
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
