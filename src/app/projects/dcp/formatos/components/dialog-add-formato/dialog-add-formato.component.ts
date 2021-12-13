import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TiposServiciosService } from "app/projects/dcp/tipos-servicios/tipos-servicios.service";
import { DialogAddFormatoService } from "./dialog-add-formato.service";

@Component({
  selector: "app-dialog-add-formato",
  templateUrl: "./dialog-add-formato.component.html",
  styleUrls: ["./dialog-add-formato.component.scss"],
})
export class DialogAddFormatoComponent implements OnInit {
  loading: boolean = false;

  form: FormGroup = this.fb.group({
    codCeco: ["", Validators.required],
    codGp: ["", Validators.required],
    codCe: ["", Validators.required],
    idTipoServicio: ["", Validators.required],
    nombre: ["", Validators.required],
    visible: [true],
    activo: [true],
    estado: [1],
  });
  clientsOpt: any;
  modelosOpt: any;
  actividadOpt: any;
  tipo_mttoOpt: any;
  services_type: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddFormatoComponent>,
    private dialogAddFormatoService: DialogAddFormatoService,
    private router: Router,
    private serviceTypes: TiposServiciosService
  ) {}

  ngOnInit(): void {
    this.getServiceTypes();
  }

  private getServiceTypes(): void {
    this.serviceTypes.getServiceTypes().subscribe((resp) => {
      this.services_type = resp.body;
    });
  }

  onSubmit() {
    if (!this.loading && this.form.valid) {
      this.loading = true;
      this.trimFields();
      this.dialogAddFormatoService
        .agregarFormato(this.trimFields())
        .subscribe((response) => {
          this.router
            .navigateByUrl("/admin/formatos/editar/" + response.body.id + "/0")
            .then(() => {
              this.dialogRef.close();
            });
        });
    }
  }

  private trimFields(): FormControl {
    Object.keys(this.form.value).forEach((key) => {
      if (typeof this.form.controls[key].value === "string") {
        this.form.controls[key].setValue(this.form.controls[key].value.trim());
      }
    });
    return this.form.value;
  }

  getErrorMessage(input: string) {
    const control = this.form.get(input);

    if (control.hasError("required")) {
      return "Campo requerido";
    }

    return control.hasError("email") ? "Formato de correo incorrecto" : "";
  }
}
