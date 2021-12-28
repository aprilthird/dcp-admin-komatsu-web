import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { TiposServiciosService } from "app/projects/dcp/tipos-servicios/tipos-servicios.service";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ActivitiesService } from "../../activities.service";

@Component({
  selector: "app-report-filter-dialog",
  templateUrl: "./report-filter-dialog.component.html",
  styleUrls: ["./report-filter-dialog.component.scss"],
})
export class ReportFilterDialogComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  typeServices$: Observable<any>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  states = states;

  constructor(
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<ReportFilterDialogComponent>,
    private _tiposServiciosService: TiposServiciosService,
    private _activitiesService: ActivitiesService
  ) {
    this.form = this.fb.group({
      os: new FormControl(""),
      idTipo: new FormControl(),
      estado: new FormControl(""),
    });
  }

  ngOnInit() {
    this._tiposServiciosService.getServiceType().subscribe(() => {
      this.typeServices$ = this._tiposServiciosService.serviceTypes$.pipe(
        takeUntil(this._unsubscribeAll)
      );
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
    Object.keys(this.form.value).forEach((x) =>
      this.form.controls[x].setValue("")
    );
  }
}

const states = [
  {
    id: 1,
    name: "Terminada",
  },

  { id: 2, name: "En procesado" },
  { id: 3, name: "Sin empezar" },
  { id: 4, name: "Observada" },
  { id: 5, name: "Programada" },
];
