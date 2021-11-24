import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Grupo } from "app/core/types/formatos.types";
import { EditarFormatoService } from "../../editar-formato/editar-formato.service";

@Component({
  selector: "app-dialog-add-grupo",
  templateUrl: "./dialog-add-grupo.component.html",
  styleUrls: ["./dialog-add-grupo.component.scss"],
})
export class DialogAddGrupoComponent implements OnInit {
  @Input() idFormato: number;
  @Input() idSeccion: number;
  @Output() success: EventEmitter<Grupo> = new EventEmitter();

  posiciones = [{ id: "h", label: "Horizontal" }, { id: "v", label: "Vertical"}];
  loading: boolean = false;

  form: FormGroup = this.fb.group({
    nombre: ["", Validators.required],
    pos: ["hoz", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private editarFormatoService: EditarFormatoService,
    public dialogRef: MatDialogRef<DialogAddGrupoComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid && !this.loading) {
      this.loading = true;
      this.editarFormatoService
        .createGrupo({
          ...this.form.value,
          id: 0,
          idFormato: Number(this.idFormato),
          idSeccion: Number(this.idSeccion),
          parametros: [],
        })
        .subscribe(
          (response) => {
            this.loading = false;
            this.success.emit({
              ...response.body,
              ...this.form.value,
              parametros: [],
            });
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
