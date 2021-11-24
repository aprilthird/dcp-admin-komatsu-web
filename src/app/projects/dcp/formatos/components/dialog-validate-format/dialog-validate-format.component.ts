import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-dialog-validate-format",
  templateUrl: "./dialog-validate-format.component.html",
  styleUrls: ["./dialog-validate-format.component.scss"],
})
export class DialogValidateFormatComponent implements OnInit {
  constructor(public matDialog: MatDialogRef<DialogValidateFormatComponent>) {}

  ngOnInit(): void {}

  validate(): void {
    this.matDialog.close();
  }
}
