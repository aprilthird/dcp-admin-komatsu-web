import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClaseActividadService } from "../clase-actividad.service";

@Component({
  selector: "app-dialog-add-tipo-mtmto",
  templateUrl: "./dialog-add-tipo-mtmto.component.html",
  styleUrls: ["./dialog-add-tipo-mtmto.component.scss"],
})
export class DialogAddTipoMtmtoComponent implements OnInit {
  form: FormGroup;
  matErrorMsg = "Dato obligatorio";

  isEdit: boolean;
  claseActividadId: number;
  isLoading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private claseActividadService: ClaseActividadService,
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<DialogAddTipoMtmtoComponent>
  ) {
    this.form = this.fb.group({
      codigo: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      estado: new FormControl(""),
    });
  }

  ngOnInit(): void {}

  submit(): void {
    this.isLoading = true;
    const params = {
      estado: this.form.controls["estado"].value ? 1 : 0,
      codido: this.form.controls["codigo"].value,
      descripcion: this.form.controls["descripcion"].value,
      nombre: this.form.controls["codigo"].value,
      idClaseActividad: this.data.idClase,
      filter: {
        idClaseActividad: this.data.idClase,
        tipo: 8,
        nombre: this.form.controls["codigo"].value,
        estado: this.form.controls["estado"].value ? 1 : 0,
        descripcion: this.form.controls["descripcion"].value,
      },
    };
    this.claseActividadService
      .postTipoMantenimeinto(params)
      .subscribe((resp) => {
        console.log(resp);
        this.isLoading = false;
        this.matdialigRef.close();
      });
  }

  check(event): void {
    setTimeout(() => {
      this.form.controls["estado"].setValue(event.checked ? 1 : 0);
    }, 200);
  }
}
