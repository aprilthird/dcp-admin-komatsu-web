import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { PermissionService } from "app/core/permission/permission.service";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DialogAddFlotasComponent } from "./dialog-add-flotas/dialog-add-flotas.component";
import { FlotaI } from "./flota-model";
import { FlotasService } from "./flotas.service";

@Component({
  selector: "app-flotas",
  templateUrl: "./flotas.component.html",
  styleUrls: ["./flotas.component.scss"],
})
export class FlotasComponent implements OnInit {
  isLoading = true;

  flotas$: Observable<FlotaI[]>;

  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public _permissonService: PermissionService,
    private _routeActived: ActivatedRoute,
    private _router: Router,
    private matDialog: MatDialog,
    private flotasService: FlotasService
  ) {
    this.getFlotas();
  }

  ngOnInit(): void {
    this.loadData();
  }

  getFlotas(): void {
    this.flotas$ = this.flotasService.flotas$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this.flotasService.pagination$;
  }

  loadData() {
    this.isLoading = true;
    this.flotasService
      .getFlotas(this._routeActived.snapshot.queryParams)
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
    this._router.navigate(["/admin/maestros/flotas"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }

  deleteFlota(): void {}

  createFlota(): void {
    this.matDialog
      .open(DialogAddFlotasComponent, {
        width: "400px",
        maxHeight: "100vh",
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  edit(modelo): void {
    this.matDialog
      .open(DialogAddFlotasComponent, {
        width: "400px",
        data: modelo,
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }
}
