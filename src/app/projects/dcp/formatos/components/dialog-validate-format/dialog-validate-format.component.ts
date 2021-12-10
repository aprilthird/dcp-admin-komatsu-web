import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { error } from "console";
import { FormatosService } from "../../formatos.service";

@Component({
  selector: "app-dialog-validate-format",
  templateUrl: "./dialog-validate-format.component.html",
  styleUrls: ["./dialog-validate-format.component.scss"],
})
export class DialogValidateFormatComponent implements OnInit {
  constructor(
    public matDialog: MatDialogRef<DialogValidateFormatComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formatosService: FormatosService
  ) {}

  ngOnInit(): void {}

  postValidateSection(): void {
    this.formatosService.validateSection(this.data).subscribe(
      () => this.matDialog.close(),
      (error) => this.matDialog.close()
    );
  }
}
