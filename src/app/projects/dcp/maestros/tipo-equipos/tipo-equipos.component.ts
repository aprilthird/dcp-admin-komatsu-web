import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { PermissionService } from "app/core/permission/permission.service";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DialogAddTipoEquipoComponent } from "./dialog-add-tipo-equipo/dialog-add-tipo-equipo.component";
import { TipoEquipoI } from "./model-tipo-equipo";
import { TipoEquiposService } from "./tipo-equipos.service";

@Component({
  selector: "app-tipo-equipos",
  templateUrl: "./tipo-equipos.component.html",
  styleUrls: ["./tipo-equipos.component.scss"],
})
export class TipoEquiposComponent implements OnInit {
  isLoading = true;

  tipo_equipos$: Observable<TipoEquipoI[]>;

  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public _permissonService: PermissionService,
    private _routeActived: ActivatedRoute,
    private _router: Router,
    private matDialog: MatDialog,
    private tipoEquipoService: TipoEquiposService
  ) {
    this.getTipoEquipo();
  }

  ngOnInit(): void {
    this.loadData();
  }

  getTipoEquipo(): void {
    this.tipo_equipos$ = this.tipoEquipoService.tipo_equipos$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this.tipoEquipoService.pagination$;
  }

  loadData() {
    this.isLoading = true;
    this.tipoEquipoService
      .getTipoEquipos(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  changePage(pagination: any): void {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.onSameUrlNavigation = "reload";

    const params = this._routeActived.snapshot.params;
    this._router.navigate(["/admin/maestros/modelos"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }

  deleteModelo(): void {}

  createModelo(): void {
    this.matDialog
      .open(DialogAddTipoEquipoComponent, {
        width: "400px",
        maxHeight: "100vh",
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  edit(modelo): void {
    this.matDialog
      .open(DialogAddTipoEquipoComponent, {
        width: "400px",
        data: modelo,
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  setLoading(loading): void {
    this.isLoading = loading;
  }
}
