import { Component, OnInit } from "@angular/core";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, map, switchMap, takeUntil } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";

import { ClientI } from "./client-model";
import { DialogAddClientComponent } from "./dialog-add-client/dialog-add-client.component";

//SERVICES
import { MaestrosService } from "../maestros.service";

import { PermissionService } from "app/core/permission/permission.service";
import { FormControl } from "@angular/forms";
import { filter } from "lodash";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.scss"],
})
export class ClientesComponent implements OnInit {
  isLoading = true;
  selectedUser = null;

  clientes$: Observable<ClientI[]>;
  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  searchInputControl: FormControl = new FormControl();

  constructor(
    private maestroServices: MaestrosService,
    public _permissonService: PermissionService,
    private _routeActived: ActivatedRoute,
    private _router: Router,
    private matDialog: MatDialog
  ) {
    this.getClients();
  }

  ngOnInit(): void {
    this.loadData();
    //this.searchFilter();
  }

  getClients(): void {
    this.clientes$ = this.maestroServices.clients$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this.maestroServices.pagination$;
  }

  loadData() {
    this.isLoading = true;
    this.maestroServices
      .getClients(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  setLoading(loading): void {
    this.isLoading = loading;
  }

  /***Filtro en el request ***/
  searchFilter(): void {
    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          //this.closeDetails();
          this.isLoading = true;
          return this.maestroServices.getClients({ nombre: query });
        }),
        map(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  edit(cliente): void {
    console.log(cliente);
    this.matDialog
      .open(DialogAddClientComponent, {
        width: "400px",
        data: cliente,
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  deleteCliente(): void {}

  changePage(pagination: any): void {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.onSameUrlNavigation = "reload";

    const params = this._routeActived.snapshot.params;
    this._router.navigate(["/admin/maestros/clientes"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }

  createClient(): void {
    this.matDialog
      .open(DialogAddClientComponent, { width: "400px" })
      .afterClosed()
      .subscribe(() => this.loadData());
  }
}
