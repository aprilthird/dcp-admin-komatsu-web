import { HttpResponseBase } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DialogAddFormatoService } from "./dialog-add-formato.service";

@Component({
  selector: "app-dialog-add-formato",
  templateUrl: "./dialog-add-formato.component.html",
  styleUrls: ["./dialog-add-formato.component.scss"],
})
export class DialogAddFormatoComponent implements OnInit {
  
  loading:boolean = false;

  form: FormGroup = this.fb.group({
    nombre: "",
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddFormatoComponent>,
    private dialogAddFormatoService:DialogAddFormatoService,
    private router:Router,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.loading && this.form.valid) {
      this.dialogAddFormatoService.agregarFormato(this.form.value).subscribe((response) => {
        this.router.navigateByUrl('/admin/formatos/editar/'  + response.body.id ).then(() => {
          this.dialogRef.close();
        })
      })
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
