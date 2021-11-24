import { X } from "@angular/cdk/keycodes";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { PermissionService } from "app/core/permission/permission.service";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { DialogAddEquiposComponent } from "./dialog-add-equipos/dialog-add-equipos.component";
import { EquipoI } from "./equipo-model";
import { EquiposService } from "./equipos.service";

@Component({
  selector: "app-equipos",
  templateUrl: "./equipos.component.html",
  styleUrls: ["./equipos.component.scss"],
})
export class EquiposComponent implements OnInit {
  isLoading = true;

  equipos$: Observable<EquipoI[]>;

  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private equipoServices: EquiposService,
    public _permissonService: PermissionService,
    private _routeActived: ActivatedRoute,
    private _router: Router,
    private matDialog: MatDialog
  ) {
    this.getEquipos();
  }

  ngOnInit(): void {
    this.loadData();
  }

  getEquipos(): void {
    this.equipos$ = this.equipoServices.equipos$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this.equipoServices.pagination$;
  }

  loadData() {
    this.isLoading = true;
    this.equipoServices
      .getEquipos(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  setLoading(loading): void {
    this.isLoading = loading;
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
    this._router.navigate(["/admin/maestros/equipos"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }

  deleteEquipo(): void {}

  createEquipo(): void {
    this.matDialog
      .open(DialogAddEquiposComponent, { width: "400px" })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  edit(equipo): void {
    this.matDialog
      .open(DialogAddEquiposComponent, {
        width: "400px",
        data: equipo,
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }
}
