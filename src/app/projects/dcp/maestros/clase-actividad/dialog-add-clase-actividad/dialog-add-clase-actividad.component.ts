import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClaseActividadI } from "../clase-actividad-model";
import { ClaseActividadService } from "../clase-actividad.service";

@Component({
  selector: "app-dialog-add-clase-actividad",
  templateUrl: "./dialog-add-clase-actividad.component.html",
  styleUrls: ["./dialog-add-clase-actividad.component.scss"],
})
export class DialogAddClaseActividadComponent implements OnInit {
  form: FormGroup;
  matErrorMsg = "Dato obligatorio";

  initData: ClaseActividadI;
  isEdit: boolean;
  claseActividadId: number;
  isLoading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private claseActividadService: ClaseActividadService,
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<DialogAddClaseActividadComponent>
  ) {
    if (this.data) {
      this.isEdit = true;
      this.initData = this.data;
      this.claseActividadId = this.data.id;
    }
    this.form = this.fb.group({
      nombre: new FormControl(this.initData?.nombre, Validators.required),
      estado: new FormControl(this.initData?.nestado === "Activo" ? 1 : 0),
    });
  }

  ngOnInit(): void {}

  submit(isEdit): void {
    this.isLoading = true;

    if (isEdit) {
      this.form.addControl("id", new FormControl(this.claseActividadId));
    }

    this.claseActividadService
      .postClaseActivida(this.form.value)
      .subscribe(() => {
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
