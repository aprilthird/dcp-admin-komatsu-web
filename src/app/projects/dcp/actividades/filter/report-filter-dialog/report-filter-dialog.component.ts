import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { TiposServiciosService } from "app/projects/dcp/tipos-servicios/tipos-servicios.service";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ActivitiesService } from "../../activities.service";
import { General } from "../../config/activitties-cofig";

@Component({
  selector: "app-report-filter-dialog",
  templateUrl: "./report-filter-dialog.component.html",
  styleUrls: ["./report-filter-dialog.component.scss"],
})
export class ReportFilterDialogComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  typeServices$: Observable<any>;
  states: any = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<ReportFilterDialogComponent>,
    private _tiposServiciosService: TiposServiciosService,
    private _activitiesService: ActivitiesService
  ) {
    this.form = this.fb.group({
      codigo: new FormControl(""),
      idTipoServicio: new FormControl(0),
      idEstado: new FormControl(0),
    });
  }

  ngOnInit() {
    this._tiposServiciosService.getServiceType().subscribe(() => {
      this.typeServices$ = this._tiposServiciosService.serviceTypes$.pipe(
        takeUntil(this._unsubscribeAll)
      );
    });

    this.getStatuses();
    this.getCurrentFilters();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private getStatuses(): void {
    this._activitiesService.getStatus(General.status).subscribe((resp) => {
      this.states = resp.body;
    });
  }

  private getCurrentFilters(): void {
    this._activitiesService._inputFilter.subscribe((filters) => {
      this.form.patchValue(filters);
    });
  }

  filter(): void {
    this._activitiesService
      .getActivities({ ...this.form.value })
      .subscribe(() => {
        this.matdialigRef.close();
      });
  }

  deleteFilters(): void {
    Object.keys(this.form.value).forEach((x) => {
      if (x === "codigo") this.form.controls[x].setValue("");
      else this.form.controls[x].setValue(0);
    });

    this.filter();
  }
}
