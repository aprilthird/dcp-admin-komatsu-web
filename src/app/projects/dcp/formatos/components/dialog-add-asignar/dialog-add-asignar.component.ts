import { Component, Input, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseAlertType } from "@fuse/components/alert";
import { Subject } from "rxjs";
import { AsignarFormatoService } from "../../asignar-formato/asignar-formato.service";

@Component({
  selector: "app-dialog-add-asignar",
  templateUrl: "./dialog-add-asignar.component.html",
  styleUrls: ["./dialog-add-asignar.component.scss"],
})
export class DialogAddAsignarComponent implements OnInit {
  @Input() data;
  loading: boolean;
  alert: { type: FuseAlertType; message: string };
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _asignarFormatoService: AsignarFormatoService,
    public dialogRef: MatDialogRef<DialogAddAsignarComponent>
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this._asignarFormatoService
        .asignarFormato(this.data)
        .subscribe((response) => {
          this.loading = false;
          // Set the alert
          this.alert = {
            type: "success",
            message: `Se asignó correctamente el formato, código del formato generado: ${response.body.codigo}`,
          };
        });
    }
  }
}
