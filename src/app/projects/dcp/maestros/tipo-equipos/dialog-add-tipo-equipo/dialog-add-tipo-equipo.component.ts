import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TipoEquipoI } from "../model-tipo-equipo";
import { TipoEquiposService } from "../tipo-equipos.service";

@Component({
  selector: "app-dialog-add-tipo-equipo",
  templateUrl: "./dialog-add-tipo-equipo.component.html",
  styleUrls: ["./dialog-add-tipo-equipo.component.scss"],
})
export class DialogAddTipoEquipoComponent implements OnInit {
  form: FormGroup;
  matErrorMsg = "Dato obligatorio";
  initData: TipoEquipoI;
  isEdit: boolean;
  tipoEquipoId: number;
  isLoading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tipoEuipoService: TipoEquiposService,
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<DialogAddTipoEquipoComponent>
  ) {
    if (this.data) {
      this.isEdit = true;
      this.initData = this.data;
      this.tipoEquipoId = this.data.id;
    }

    this.form = this.fb.group({
      nombre: new FormControl(this.initData?.nombre, Validators.required),
      estado: new FormControl(this.initData?.nestado === "Activo" ? 1 : 0),
    });

    this.form.addControl(
      "id",
      this.fb.control({ value: this.initData?.id, disabled: true })
    );
  }

  ngOnInit(): void {}

  submit(isEdit): void {
    this.form.controls["id"].enable();
    this.isLoading = true;

    if (isEdit) {
      this.form.addControl("id", new FormControl(this.tipoEquipoId));
    }

    this.tipoEuipoService.postTipoEquipo(this.form.value).subscribe(() => {
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
