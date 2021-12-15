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
  isEdit: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<DialogAddTipoServicioComponent>,
    private _azureService: AzureService,
    private tiposServiciosService: TiposServiciosService
  ) {
    if (this.data?.id) this.isEdit = true;
    this.form = this.fb.group({
      id: new FormControl(this.data?.id ? this.data?.id : 0),
      nombre: new FormControl(
        this.data?.nombre ? this.data?.nombre : "",
        Validators.required
      ),
      icono: new FormControl(this.data?.icono ? this.data?.nombre : ""),
    });
  }

  ngOnInit(): void {}

  submit(): void {
    this.isLoading = true;
    this.tiposServiciosService.postServiceType(this.form.value).subscribe(
      () => {
        this.isLoading = false;
        this.matdialigRef.close();
      },
      () => (this.isLoading = false)
    );
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
