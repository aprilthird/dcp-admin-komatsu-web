import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { PermissionService } from "app/core/permission/permission.service";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DialogAddModelosComponent } from "./dialog-add-modelos/dialog-add-modelos.component";
import { ModeloI } from "./modelo-model";
import { ModelosService } from "./modelos.service";

@Component({
  selector: "app-modelos",
  templateUrl: "./modelos.component.html",
  styleUrls: ["./modelos.component.scss"],
})
export class ModelosComponent implements OnInit {
  isLoading = true;

  modelos$: Observable<ModeloI[]>;

  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public _permissonService: PermissionService,
    private _routeActived: ActivatedRoute,
    private _router: Router,
    private matDialog: MatDialog,
    private modelosService: ModelosService
  ) {
    this.getModelos();
  }

  ngOnInit(): void {
    this.loadData();
  }

  getModelos(): void {
    this.modelos$ = this.modelosService.modelos$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this.modelosService.pagination$;
  }

  loadData() {
    this.isLoading = true;
    this.modelosService
      .getModelos(this._routeActived.snapshot.queryParams)
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
      .open(DialogAddModelosComponent, {
        width: "400px",
        maxHeight: "100vh",
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  edit(modelo): void {
    this.matDialog
      .open(DialogAddModelosComponent, {
        width: "400px",
        data: modelo,
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }
}
