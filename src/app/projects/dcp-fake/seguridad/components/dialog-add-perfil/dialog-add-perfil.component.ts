import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddPerfilService } from './dialog-add-perfil.service';

@Component({
  selector: 'app-dialog-add-perfil',
  templateUrl: './dialog-add-perfil.component.html',
  styleUrls: ['./dialog-add-perfil.component.scss']
})
export class DialogAddPerfilComponent implements OnInit {

  loading:boolean = false;

  form: FormGroup = this.fb.group({
    nombre: "",
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddPerfilComponent>,
    private router:Router,
    private dialogAddUsuarioService: DialogAddPerfilService,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.loading && this.form.valid) {
      this.loading = true;
      this.dialogAddUsuarioService.addUsuario(this.form.value).subscribe((response) => {
        this.loading = false;
        this.router.navigateByUrl('/admin/seguridad/perfiles/editar/'  + response.body.id ).then(() => {
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
