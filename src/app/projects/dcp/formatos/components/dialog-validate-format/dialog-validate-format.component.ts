import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { FormatosService } from "../../formatos.service";

@Component({
  selector: "app-dialog-validate-format",
  templateUrl: "./dialog-validate-format.component.html",
  styleUrls: ["./dialog-validate-format.component.scss"],
})
export class DialogValidateFormatComponent implements OnInit {
  @Output() success: EventEmitter<any> = new EventEmitter();
  loading: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public matDialog: MatDialogRef<DialogValidateFormatComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formatosService: FormatosService
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  postValidateSection(): void {
    this.loading = true;
    this.formatosService.validateSection(this.data).subscribe(
      (resp) => {
        this.success.emit(resp), (this.loading = false);
      },
      (error) => {
        this.success.emit(error), (this.loading = false);
      }
    );
  }
}
