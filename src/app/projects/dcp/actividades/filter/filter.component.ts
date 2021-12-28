import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { setFormatDate } from "app/shared/utils/datesFormat";
import { ActivitiesService } from "../activities.service";
import { FilterDialogComponent } from "./filter-dialog/filter-dialog.component";
import { ReportFilterDialogComponent } from "./report-filter-dialog/report-filter-dialog.component";
@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  dateRange = new FormGroup({
    startDate: new FormControl({ value: null }),
    endDate: new FormControl({ value: null }),
  });

  @Output() range: EventEmitter<any> = new EventEmitter();
  @Input() inbox: string;
  isFilter: boolean;
  constructor(
    private matDialog: MatDialog,
    private _activitiesService: ActivitiesService
  ) {}

  ngOnInit(): void {
    this.isFiltered();
  }

  openFilter(): void {
    if (this.inbox === "informe") {
      this.matDialog.open(ReportFilterDialogComponent, { width: "370px" });
    } else {
      this.matDialog.open(FilterDialogComponent, { width: "370px" });
    }
  }
  changeDate(): void {
    this.range.emit(this.dateRange.value);
    const startDate = new Date(this.dateRange.controls["startDate"].value);
    const endDate = new Date(this.dateRange.controls["endDate"].value);
    if (Number(setFormatDate(endDate).split("-")[0]) > 2020) {
      /*this._activitiesService._rangeDate.next({
        fechaInicio: setFormatDate(startDate),
        fechaFin: setFormatDate(endDate),
      });*/
      this.loadInbox(setFormatDate(startDate), setFormatDate(endDate));
    }
  }

  loadInbox(fechaInicio: string, fechaFin: string) {
    switch (this.inbox) {
      case "informe":
        return this._activitiesService
          .getActivities({ fechaInicio, fechaFin })
          .subscribe(() => {});
    }
  }

  private isFiltered(): void {
    this._activitiesService._isFilter.subscribe(
      (isFilter) => (this.isFilter = isFilter)
    );
  }

  deleteFilters() {}
}
