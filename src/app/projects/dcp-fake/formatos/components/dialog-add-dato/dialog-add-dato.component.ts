import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Grupo } from "app/core/types/formatos.types";
import { EditarFormatoService } from "../../editar-formato/editar-formato.service";

@Component({
  selector: "app-dialog-add-dato",
  templateUrl: "./dialog-add-dato.component.html",
  styleUrls: ["./dialog-add-dato.component.scss"],
})
export class DialogAddDatoComponent implements OnInit {
  
  @Input() data: Grupo;
  @Input() edit:any;
  @Output() success: EventEmitter<any> = new EventEmitter();

  loading: boolean = false;
  tiposDatos:any;

  form: FormGroup = this.fb.group({
    idParametro: ["", Validators.required],
    placeholder: ["", Validators.required],
    label: ["", Validators.required],
    visible: [true, Validators.required],
    obligatorio: [true, Validators.required],
    editable: [true, Validators.required],
    minCaracteres: [null],
    maxCaracteres: [null],
    regex: [""],
    fila: ["", Validators.required],
    columna: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddDatoComponent>,
    private _editarFormatoService: EditarFormatoService
  ) {
    this.tiposDatos = this._editarFormatoService.datos();
  }

  ngOnInit(): void {
    if (this.edit) {
      this.form.setValue({
        idParametro: this.edit.idParametro,
        placeholder: this.edit.placeholder,
        label: this.edit.label,
        visible: this.edit.visible,
        obligatorio: this.edit.obligatorio,
        editable: this.edit.editable,
        minCaracteres: this.edit.minCaracteres,
        maxCaracteres: this.edit.maxCaracteres,
        regex: this.edit.regex,
        fila: this.edit.fila,
        columna: this.edit.columna,
      })
    }
  }

  onSubmit() {
    if (this.form.valid && !this.loading) {
      this.loading = true;
      const { parametros, ...data } = this.data;

      const body = { ...data, parametros: [] };
      body.parametros.push({
        ...this.form.value,
        idGrupo: body.id,
        ...(this.edit ? {id: this.edit.id}: {})
      });
      this._editarFormatoService.createDato(body).subscribe(
        (response) => {
          this.loading = false;
          this.success.emit(response.body)
          setTimeout(() => {
            this.dialogRef.close();
          }, 100);
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
