import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { PermissionService } from "app/core/permission/permission.service";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BahiaI } from "./bahia-model";
import { BahiasService } from "./bahias.service";
import { DialogAddBahiasComponent } from "./dialog-add-bahias/dialog-add-bahias.component";

@Component({
  selector: "app-bahias",
  templateUrl: "./bahias.component.html",
  styleUrls: ["./bahias.component.scss"],
})
export class BahiasComponent implements OnInit {
  isLoading = true;

  bahias$: Observable<BahiaI[]>;

  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public _permissonService: PermissionService,
    private _routeActived: ActivatedRoute,
    private _router: Router,
    private matDialog: MatDialog,
    private bahiasService: BahiasService
  ) {
    this.getBabias();
  }

  ngOnInit(): void {
    this.loadData();
  }

  getBabias(): void {
    this.bahias$ = this.bahiasService.bahias$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this.bahiasService.pagination$;
  }

  loadData() {
    this.isLoading = true;
    this.bahiasService
      .getBahias(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
    this.isLoading = false;
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
    this._router.navigate(["/admin/maestros/bahias"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }

  createBahia(): void {
    this.matDialog
      .open(DialogAddBahiasComponent, { width: "400px", maxHeight: "100vh" })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  edit(equipo): void {
    this.matDialog
      .open(DialogAddBahiasComponent, {
        width: "400px",
        data: equipo,
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }
}
