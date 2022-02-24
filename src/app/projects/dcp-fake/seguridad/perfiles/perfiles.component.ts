import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DialogAddPerfilComponent } from "../components/dialog-add-perfil/dialog-add-perfil.component";
import { PerfilesService } from "./perfiles.services";

@Component({
  selector: "app-perfiles",
  templateUrl: "./perfiles.component.html",
  styleUrls: ["./perfiles.component.scss"],
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
export class PerfilesComponent implements OnInit, OnDestroy {
  isLoading = false;
  perfiles$: Observable<any>;
  pagination$: Observable<Pagination>;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _perfilesServices: PerfilesService,
    private _routeActived: ActivatedRoute,
    private _router: Router,
    private _matDialog: MatDialog,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.perfiles$ = this._perfilesServices.perfiles$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this._perfilesServices.pagination$;
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
    this._perfilesServices
      .getPerfiles(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  changePage(pagination: any) {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.onSameUrlNavigation = "reload";

    const params = this._routeActived.snapshot.params;
    this._router.navigate(["/admin/seguridad/perfiles"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }

  clickAddPerfil() {
    const dialogRef = this._matDialog.open(DialogAddPerfilComponent);
  }

  /**
   * Delete product
   */
  deleteUsuario(perfil): void {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar perfil",
      message: "¿Estás seguro que deseas eliminar este perfil?",
      icon: {
        name: "heroicons_outline:trash",
        color: "primary",
      },
      actions: {
        confirm: {
          label: "Sí, eliminar",
          color: "primary",
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
        this._perfilesServices
          .deletePerfil({ id: perfil.id, activo: false })
          .subscribe(() => {
            this.loadData();
          });
      }
    });
  }
}
