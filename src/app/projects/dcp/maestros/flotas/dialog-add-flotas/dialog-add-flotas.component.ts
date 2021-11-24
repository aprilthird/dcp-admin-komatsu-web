import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MaestrosService } from "../../maestros.service";
import { FlotaI } from "../flota-model";
import { FlotasService } from "../flotas.service";

@Component({
  selector: "app-dialog-add-flotas",
  templateUrl: "./dialog-add-flotas.component.html",
  styleUrls: ["./dialog-add-flotas.component.scss"],
})
export class DialogAddFlotasComponent implements OnInit {
  form: FormGroup;
  matErrorMsg = "Dato obligatorio";

  initData: FlotaI;
  isEdit: boolean;
  flotaId: number;
  isLoading: boolean;
  clienteOptions: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private flotaService: FlotasService,
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<DialogAddFlotasComponent>,
    private maestServ: MaestrosService
  ) {
    if (this.data) {
      this.isEdit = true;
      this.initData = this.data;
      this.flotaId = this.data.id;
    }
    this.form = this.fb.group({
      nombre: new FormControl(this.initData?.nombre, Validators.required),
      cliente: new FormControl(this.initData?.cliente, Validators.required),
      estado: new FormControl(this.initData?.nestado === "Activo" ? 1 : 0),
    });

    this.setCliente();
  }

  ngOnInit(): void {}

  setCliente(): void {
    this.maestServ.getList(1).subscribe((resp: any) => {
      this.clienteOptions = resp.body.data;
    });
  }

  submit(isEdit): void {
    this.isLoading = true;

    if (isEdit) {
      this.form.addControl("id", new FormControl(this.flotaId));
    }

    this.flotaService.postFlota(this.form.value).subscribe(() => {
      setTimeout(() => {
        this.isLoading = false;
        this.matdialigRef.close();
      }, 1000);
    });
  }

  check(event): void {
    setTimeout(() => {
      this.form.controls["estado"].setValue(event.checked ? 1 : 0);
    }, 200);
  }
}
