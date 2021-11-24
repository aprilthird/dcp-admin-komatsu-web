import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FilterDialogComponent } from "../../actividades/filter/filter-dialog/filter-dialog.component";
import { DialogAddFormatoComponent } from "../components/dialog-add-formato/dialog-add-formato.component";
import { ListadoService } from "./listado.services";

@Component({
  selector: "app-listado",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.scss"],
})
export class ListadoComponent implements OnInit, OnDestroy {
  isLoading = true;

  formatos$: Observable<any[]>;
  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private _routeActived: ActivatedRoute,
    private _listadoService: ListadoService,
    public dialog: MatDialog
  ) {
    this.formatos$ = this._listadoService.formatos$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this._listadoService.pagination$;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this._listadoService
      .getFormatos(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  clickNewFormato() {
    const dialogRef = this.dialog.open(DialogAddFormatoComponent, {
      autoFocus: false,
      width: "376px",
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  changePage(pagination: any) {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.onSameUrlNavigation = "reload";

    const params = this._routeActived.snapshot.params;
    this._router.navigate(["/admin/formatos"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }

  openFilter(): void {
    this.dialog.open(FilterDialogComponent, { width: "370px" });
  }
}
