import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { EditarFormatoService } from "../../editar-formato/editar-formato.service";

@Component({
  selector: "app-dialog-add-seccion",
  templateUrl: "./dialog-add-seccion.component.html",
  styleUrls: ["./dialog-add-seccion.component.scss"],
})
export class DialogAddSeccionComponent implements OnInit {
  @Input() idFormato: number;
  @Output() success: EventEmitter<void> = new EventEmitter();

  loading: boolean = false;

  form: FormGroup = this.fb.group({
    nombre: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private editarFormatoService: EditarFormatoService,
    public dialogRef: MatDialogRef<DialogAddSeccionComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid && !this.loading) {
      this.loading = true;
      this.editarFormatoService
        .createSeccion({
          ...this.form.value,
          idFormato: Number(this.idFormato),
        })
        .subscribe(
          (response) => {
            this.loading = false;
            this.success.emit();
          },
          () => {
            this.loading = false;
          }
        );
    }
  }

  getErrorMessage(input: string) {
    const control = this.form.get(input);

    if (control.hasError("required")) {
      return "Campo requerido";
    }

    return control.hasError("email") ? "Formato de correo incorrecto" : "";
  }
}
