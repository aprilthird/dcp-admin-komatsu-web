import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Formato } from "app/core/types/formatos.types";
import { Usuario } from "app/core/types/user.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DialogAddAsignarComponent } from "../components/dialog-add-asignar/dialog-add-asignar.component";
import { EditarFormatoService } from "../editar-formato/editar-formato.service";
import { AsignarFormatoService } from "./asignar-formato.service";

@Component({
  selector: "app-asignar-formato",
  templateUrl: "./asignar-formato.component.html",
  styleUrls: ["./asignar-formato.component.scss"],
})
export class AsignarFormatoComponent implements OnInit {
  isLoading: boolean = false;
  formato$: Observable<Formato>;
  usuarios: any;
  pagination$: Observable<any>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  usuarios$: Observable<Usuario[]>;
  id: string;

  constructor(
    private _editarFormatoService: EditarFormatoService,
    private _asignarFormatoService: AsignarFormatoService,
    private _routeActived: ActivatedRoute,
    private _matDialog: MatDialog,
    private _router: Router
  ) {
    this.formato$ = this._editarFormatoService.formato$;

    this.usuarios$ = this._asignarFormatoService.usuarios$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this._asignarFormatoService.pagination$;
  }

  ngOnInit(): void {
    this.loadData();
    this.id = this._routeActived.snapshot.params.id;
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  loadData() {
    this.isLoading = true;
    this._asignarFormatoService
      .getUsuarios(this._routeActived.snapshot.queryParams)
      .subscribe((response) => {
        this.usuarios = response.body.data;
        this.isLoading = false;
      });
  }

  changeAsignacion(usuario) {
    const dialogRef = this._matDialog.open(DialogAddAsignarComponent, {
      autoFocus: false,
      width: "376px",
    });

    dialogRef.componentInstance.data = {
      idUsuario: usuario.id,
      idFormato: this._routeActived.snapshot.params.id,
    };
  }

  changePage(pagination: any) {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.onSameUrlNavigation = "reload";

    const params = this._routeActived.snapshot.params;
    this._router.navigate([`/admin/formatos/asignar/${this.id}`], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }
}
