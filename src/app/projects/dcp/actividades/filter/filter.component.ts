import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { FilterDialogComponent } from "./filter-dialog/filter-dialog.component";

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
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  openFilter(): void {
    this.matDialog.open(FilterDialogComponent, { width: "370px" });
  }
  changeDate(): void {
    this.range.emit(this.dateRange.value);
  }
}
