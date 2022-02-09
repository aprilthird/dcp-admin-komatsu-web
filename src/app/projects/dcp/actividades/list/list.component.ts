import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Pagination } from "app/core/types/list.types";
import { ExportExcelService } from "app/shared/utils/export-excel.ts.service";
import { environment } from "environments/environment";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { EditarFormatoService } from "../../formatos/editar-formato/editar-formato.service";
import { ActivitiesService } from "../activities.service";

@Component({
  selector: "list-activities",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  asignaciones$: Observable<any[]>;
  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isLoading = false;

  activities$: Observable<any>;
  dateRange$: Observable<any>;
  isEdit: boolean;

  start = new Date().toLocaleDateString("es-ES");
  end = new Date().toLocaleDateString("es-ES");

  constructor(
    private activitiesService: ActivitiesService,
    private asignationService: EditarFormatoService,
    private _router: Router,
    private _routeActived: ActivatedRoute,
    private exportExcelService: ExportExcelService
  ) {
    this.getActivities();
  }

  ngOnInit(): void {
    this.loadData();
    this.dateRange$ = this.activitiesService._rangeDate.pipe(
      takeUntil(this._unsubscribeAll)
    );
  }

  getActivities(): void {
    this.activities$ = this.activitiesService.activities$.pipe(
      takeUntil(this._unsubscribeAll)
    );

    this.pagination$ = this.activitiesService.pagination$;
  }

  loadData() {
    this.isLoading = true;
    this.activitiesService
      .getActivities(this._routeActived.snapshot.queryParams)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  daterange(event): void {
    if (event.startDate) {
      this.start = new Date(event.startDate._d).toLocaleDateString("en-US");
    }
    if (event.endDate) {
      this.end = new Date(event.endDate._d).toLocaleDateString("en-US");
    }
  }

  redirectToValidation(currentIdAsignation): void {
    this.asignationService
      .getAbrirAsignacion(currentIdAsignation.id)
      .subscribe(async (resp) => {
        const sections = await resp.body.secciones;

        if (sections.length > 0) {
          this._router.navigate([
            `/admin/informes/validation/${currentIdAsignation.id}/${sections[0].id}`,
          ]);
        }
      });
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

  redirectToGallery(idFormat: number): void {
    this.activitiesService._idFormat.next(idFormat);
    this._router.navigate([
      `/admin/informes/validation/fotografias/${idFormat}`,
    ]);
  }

  redirectToAttachDocs(idFormat: number): void {
    this.activitiesService._idFormat.next(idFormat);
    this._router.navigate([
      `/admin/informes/validation/documentos/${idFormat}`,
    ]);
  }

  printPdf(actividad): void {
    fetch(environment.apiUrl + "/Reportes/GenerarInforme/" + actividad.id)
      .then((resp) => resp.blob())
      .then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = actividad.codEquipo + ".pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  exportToExcel(): void {
    this.exportExcelService.exportAsExcelFile(
      this.activitiesService._activities.getValue(),
      "Informes"
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
