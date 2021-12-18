import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { AzureService } from "app/core/azure/azure.service";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FilterDialogComponent } from "../actividades/filter/filter-dialog/filter-dialog.component";
import { DialogAddTipoServicioComponent } from "./dialog-add-tipo-servicio/dialog-add-tipo-servicio.component";
import { TiposServiciosService } from "./tipos-servicios.service";

@Component({
  selector: "app-tipos-servicios",
  templateUrl: "./tipos-servicios.component.html",
  styleUrls: ["./tipos-servicios.component.scss"],
})
export class TiposServiciosComponent implements OnInit {
  isLoading: boolean;
  serviceTypes$: Observable<any>;
  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private _routeActived: ActivatedRoute,
    public dialog: MatDialog,
    private tiposServiciosService: TiposServiciosService,
    private _azureService: AzureService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.getServiceType();
  }

  ngOnInit(): void {
    this.loadData();
  }

  getServiceType(): void {
    this.isLoading = true;
    this.serviceTypes$ = this.tiposServiciosService.serviceTypes$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this.tiposServiciosService.pagination$;
  }

  loadData() {
    this.isLoading = true;
    this.tiposServiciosService
      .getServiceType(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
    this.isLoading = false;
  }

  changePage(pagination: any): void {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.onSameUrlNavigation = "reload";

    const params = this._routeActived.snapshot.params;
    this._router.navigate(["/admin/informes/list"], {
      queryParams: {
        ...params,
        pageSize: pagination.pageSize,
        page: pagination.pageIndex,
      },
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  openFilter(): void {
    this.dialog.open(FilterDialogComponent, { width: "370px" });
  }

  clickNewTipoServicio() {
    this.dialog
      .open(DialogAddTipoServicioComponent, {
        autoFocus: false,
        width: "376px",
      })
      .afterClosed()
      .subscribe(() => {
        this.loadData();
      });
  }

  clickOpenFile(resourceName) {
    window.open(
      this._azureService.getResourceUrlComplete(resourceName),
      "blank"
    );
  }

  setImage(src: string): string {
    return this._azureService.getResourceUrlComplete(src);
  }

  editServiceType(tipos_servicio): void {
    this.dialog
      .open(DialogAddTipoServicioComponent, {
        autoFocus: false,
        width: "376px",
        data: tipos_servicio,
      })
      .afterClosed()
      .subscribe(() => {
        this.loadData();
      });
  }

  deleteServiceType(tipos_servicio): void {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar tipo de servicio",
      message: "¿Estás seguro que desea eliminar dicho de servicio?",

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
      const data = {
        id: tipos_servicio.id,
        activo: false,
        icono: tipos_servicio?.icono,
        nombre: tipos_servicio?.nombre,
      };

      if (result === "confirmed") {
        this.tiposServiciosService.postServiceType(data).subscribe((resp) => {
          this.loadData();
        });
      }
    });
  }
}
