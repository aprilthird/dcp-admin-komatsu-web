import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Grupo } from "app/core/types/formatos.types";
import { Subject } from "rxjs";
import { EditarFormatoService } from "../../editar-formato/editar-formato.service";

@Component({
  selector: "app-dialog-add-grupo",
  templateUrl: "./dialog-add-grupo.component.html",
  styleUrls: ["./dialog-add-grupo.component.scss"],
})
export class DialogAddGrupoComponent implements OnInit {
  @Input("data") data: any;
  @Input() idFormato: number;
  @Input() idSeccion: number;
  @Output() success: EventEmitter<Grupo> = new EventEmitter();
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  id = 0;

  posiciones = [
    { id: "h", label: "Horizontal" },
    { id: "v", label: "Vertical" },
  ];
  loading: boolean = false;

  form: FormGroup = this.fb.group({
    nombre: ["", Validators.required],
    pos: ["h", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private editarFormatoService: EditarFormatoService,
    public dialogRef: MatDialogRef<DialogAddGrupoComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.form.controls["pos"].disable();
      this.id = this.data.id;
      this.form.controls["nombre"].setValue(this.data?.nombre);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  async onSubmit() {
    if (this.form.valid && !this.loading) {
      this.loading = true;
      let payload: any;
      if (this.data) {
        payload = {
          ...this.data,
          nombre: this.form.controls["nombre"].value,
          id: this.id,
          idFormato: this.idFormato,
          idSeccion: this.data.idSeccion,
          parametros: this.data.parametros,
          activo: true,
        };
      } else {
        payload = {
          ...this.form.value,
          id: 0,
          idFormato: Number(this.idFormato),
          idSeccion: Number(this.idSeccion),
          parametros: [],
        };
      }

      this.editarFormatoService.createGrupo(payload).subscribe(
        (response) => {
          this.loading = false;
          this.success.emit({
            ...response.body,
            ...this.form.value,
            parametros: [],
            activo: true,
          });
          this.dialogRef.close();
        },
        () => {
          this.loading = false;
          this.dialogRef.close();
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

  preventDefault(): boolean {
    return false;
  }
}
