import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { PermissionService } from "app/core/permission/permission.service";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DispositivosService } from "../../ajustes/dispositivos/dispositivos.services";
import { DialogAddDispositivosComponent } from "./dialog-add-dispositivos/dialog-add-dispositivos.component";
import { DispositivoI } from "./dispositivo-model";
//import { DispositivosService } from "./dispositivos.service";

@Component({
  selector: "app-dispositivos",
  templateUrl: "./dispositivos.component.html",
  styleUrls: ["./dispositivos.component.scss"],
})
export class DispositivosComponent implements OnInit {
  isLoading = true;

  dispositivos$: Observable<DispositivoI[]>;

  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public _permissonService: PermissionService,
    private _routeActived: ActivatedRoute,
    private _dispositivosServices: DispositivosService
  ) {
    this.getDispositivos();
  }

  ngOnInit(): void {
    this.loadData();
  }

  getDispositivos(): void {
    this.dispositivos$ = this._dispositivosServices.dispositivos$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this._dispositivosServices.pagination$;
  }
  loadData() {
    this.isLoading = true;
    this._dispositivosServices
      .getDispositivos(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
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
}
