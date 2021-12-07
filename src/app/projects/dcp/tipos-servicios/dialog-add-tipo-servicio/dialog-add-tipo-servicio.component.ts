import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AzureService } from "app/core/azure/azure.service";
import { TiposServiciosService } from "../tipos-servicios.service";

@Component({
  selector: "app-dialog-add-tipo-servicio",
  templateUrl: "./dialog-add-tipo-servicio.component.html",
  styleUrls: ["./dialog-add-tipo-servicio.component.scss"],
})
export class DialogAddTipoServicioComponent implements OnInit {
  form: any;
  filesLoading: boolean;
  isLoading: boolean;
  services_type: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<DialogAddTipoServicioComponent>,
    private _azureService: AzureService
  ) {
    this.form = this.fb.group({
      id: new FormControl(),
      tipo_servicio: new FormControl(),
      icono: new FormControl(),
    });
  }

  ngOnInit(): void {}

  submit(): void {}

  async onChageFile(event: any) {
    if (event) {
      const { target } = event;
      const file = target.files[0];
      const blob = new Blob([file], { type: file.type });
      this.filesLoading = true;
      try {
        const response = await this._azureService.uploadFile(blob, file.name);
        this.form.get("icono").setValue([response.uuidFileName]);
      } catch (e) {}
      this.filesLoading = false;
    } else {
      this.form.get("icono").setValue("");
    }
  }
}
