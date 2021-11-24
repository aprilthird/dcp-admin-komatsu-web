import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { Pagination } from "app/core/types/list.types";
import { SharedService } from "app/shared/shared.service";
import { ExportExcelService } from "app/shared/utils/export-excel.ts.service";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DialogAddPerfilComponent } from "../components/dialog-add-perfil/dialog-add-perfil.component";
import { PerfilesService } from "./perfiles.services";

@Component({
  selector: "app-perfiles",
  templateUrl: "./perfiles.component.html",
  styleUrls: ["./perfiles.component.scss"],
})
export class PerfilesComponent implements OnInit, OnDestroy {
  isLoading = false;
  perfiles$: Observable<any>;
  pagination$: Observable<Pagination>;
  currentTableData: any[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _perfilesServices: PerfilesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _matDialog: MatDialog,
    private _fuseConfirmationService: FuseConfirmationService,
    private exportExcelService: ExportExcelService,
    private shared: SharedService
  ) {
    this.perfiles$ = this._perfilesServices.perfiles$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this._perfilesServices.pagination$;
  }

  ngOnInit(): void {
    this.loadData();
    this.getCurrentTableData();
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
      .getPerfiles(this._activatedRoute.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  changePage(pagination: any) {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.onSameUrlNavigation = "reload";

    const params = this._activatedRoute.snapshot.params;
    this._router.navigate(["/admin/seguridad/perfiles"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }

  clickAddPerfil() {
    const dialogRef = this._matDialog.open(DialogAddPerfilComponent, {
      width: "450px",
    });
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
      console.log(result);
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

  editProfile(idProfile): void {
    localStorage.removeItem("nuevo_perfil");
    setTimeout(() => {
      this._router.navigate([`/admin/ajustes/perfiles/${idProfile}`]);
    }, 100);
  }

  private getCurrentTableData(): void {
    this.shared.currentTableData.subscribe((data) => {
      this.currentTableData = data;
    });
  }
  exportToExcel(): void {
    this.exportExcelService.exportAsExcelFile(this.currentTableData, "data");
  }
}
