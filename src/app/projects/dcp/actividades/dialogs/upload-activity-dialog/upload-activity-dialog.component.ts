import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: "app-upload-activity-dialog",
  templateUrl: "./upload-activity-dialog.component.html",
  styleUrls: ["./upload-activity-dialog.component.scss"],
})
export class UploadActivityDialogComponent implements OnInit {
  constructor(
    public matDialogRef: MatDialogRef<UploadActivityDialogComponent>
  ) {}

  ngOnInit(): void {}
}
