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
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { FormatosService } from "../../formatos.service";
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
    descripcion: [""],
    visible: [true],
    activo: [true],
    estado: [1],
  });
  cecoData: any;
  gpData: any;
  ceData: any;
  services_type: any;
  filesLoading: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddFormatoComponent>,
    private dialogAddFormatoService: DialogAddFormatoService,
    private router: Router,
    private serviceTypes: TiposServiciosService,
    private formatServices: FormatosService
  ) {}

  ngOnInit(): void {
    this.getServiceTypes();
    this.getCombos();
  }

  private getServiceTypes(): void {
    this.serviceTypes.getServiceType().subscribe((resp: any) => {
      this.services_type = resp.body.data;
    });
  }

  private getCombos(): void {
    this.loading = true;
    let ceco = this.formatServices
      .obtenerGenereales(1)
      .pipe(map((x: any) => x.body));
    let gp = this.formatServices
      .obtenerGenereales(2)
      .pipe(map((x: any) => x.body));
    let ce = this.formatServices
      .obtenerGenereales(3)
      .pipe(map((x: any) => x.body));

    forkJoin([ceco, gp, ce]).subscribe((result: any) => {
      this.cecoData = result[0];
      this.gpData = result[1];
      this.ceData = result[2];
      this.loading = false;
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
