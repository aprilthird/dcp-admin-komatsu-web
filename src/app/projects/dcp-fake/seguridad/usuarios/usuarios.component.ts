import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { PermissionService } from "app/core/permission/permission.service";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UsuariosService } from "./usuarios.service";
import { Usuario } from "./usuarios.types";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: [
    /* language=SCSS */
    `
      .inventory-grid {
        grid-template-columns: 120px 120px 180px;
        @screen sm {
          grid-template-columns: 250px 250px 180px;
        }

        @screen md {
          grid-template-columns: 300px 300px 190px;
        }

        @screen lg {
          grid-template-columns: 250px 250px 200px 200px 150px;
        }

        @screen xl {
          grid-template-columns: 300px 300px 220px 220px 150px;
        }
      }
    `,
  ],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  isLoading = true;
  selectedUser = null;

  usuarios$: Observable<Usuario[]>;
  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _usuariosService: UsuariosService,
    private _routeActived: ActivatedRoute,
    private _router: Router,
    private _fuseConfirmationService: FuseConfirmationService,
    public _permissonService: PermissionService
  ) {
    this.usuarios$ = this._usuariosService.usuarios$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this._usuariosService.pagination$;
  }

  ngOnInit(): void {
    this.loadData();
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
    this._usuariosService
      .getUsuarios(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  /**
   * Delete product
   */
  deleteUsuario(usuario: Usuario): void {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar usuario",
      message: "¿Estás seguro que deseas eliminar este usuario?",
      icon: {
        name: "heroicons_outline:trash",
      },
      actions: {
        confirm: {
          label: "Sí, eliminar",
        },
        cancel: {
          label: "No",
        },
      },
      dismissible: true,
    });

    dialogRef.beforeClosed().subscribe((result) => {
      if (result === "confirmed") {
        this.isLoading = true;
        this._usuariosService.deleteUsuario(usuario.id).subscribe(() => {
          this.loadData();
        });
      }
    });
  }

  toggleDetails(usuario): void {
    if (!this.selectedUser) {
      this.selectedUser = usuario;
    } else if (this.selectedUser.id !== usuario.id) {
      this.selectedUser = usuario;
    } else {
      this.selectedUser = null;
    }
  }

  changePage(pagination: any) {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.onSameUrlNavigation = "reload";

    const params = this._routeActived.snapshot.params;
    this._router.navigate(["/admin/seguridad/usuarios"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }
}
