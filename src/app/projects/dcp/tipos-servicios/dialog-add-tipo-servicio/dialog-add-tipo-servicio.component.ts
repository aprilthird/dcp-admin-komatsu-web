import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AzureService } from "app/core/azure/azure.service";

//SERVICES
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
    private _azureService: AzureService,
    private tiposServiciosService: TiposServiciosService
  ) {
    this.form = this.fb.group({
      id: new FormControl(0),
      nombre: new FormControl("", Validators.required),
      icono: new FormControl(),
    });
  }

  ngOnInit(): void {}

  submit(): void {
    this.tiposServiciosService
      .postServiceType(this.form.value)
      .subscribe(() => {
        this.matdialigRef.close();
      });
  }

  async onChageFile(event: any) {
    if (event) {
      const { target } = event;
      const file = target.files[0];
      const blob = new Blob([file], { type: file.type });
      this.filesLoading = true;
      try {
        const response = await this._azureService.uploadFile(blob, file.name);
        this.form.get("icono").setValue(response.uuidFileName);
      } catch (e) {}
      this.filesLoading = false;
    } else {
      this.form.get("icono").setValue("");
    }
  }
}
