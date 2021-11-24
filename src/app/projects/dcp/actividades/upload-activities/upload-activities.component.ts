import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UploadActivityDialogComponent } from "../dialogs/upload-activity-dialog/upload-activity-dialog.component";

@Component({
  selector: "upload-print-activities",
  templateUrl: "./upload-activities.component.html",
  styleUrls: ["./upload-activities.component.scss"],
})
export class UploadActivitiesComponent implements OnInit {
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  openUploadAct(): void {
    this.matDialog.open(UploadActivityDialogComponent, { width: "400px" });
  }
}
