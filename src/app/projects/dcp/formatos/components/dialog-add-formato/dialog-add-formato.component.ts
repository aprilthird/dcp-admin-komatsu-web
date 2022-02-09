import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TiposServiciosService } from "app/projects/dcp/tipos-servicios/tipos-servicios.service";
import { forkJoin, Subject } from "rxjs";
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
    nombre: ["", Validators.required],
    idTipoServicio: ["", Validators.required],
    visible: [true],
    activo: [true],
    estado: [1],
  });
  cecoData: any;
  gpData: any;
  ceData: any;
  services_type: any;
  filesLoading: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DialogAddFormatoComponent>,
    private dialogAddFormatoService: DialogAddFormatoService,
    private router: Router,
    private serviceTypes: TiposServiciosService,
    private formatServices: FormatosService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.isEdit();
  }

  createForm(): void {
    this.getServiceTypes();
    if (this.data?.type === "format") {
      this.form.addControl("codCeco", new FormControl("", Validators.required));
      this.form.addControl("codGp", new FormControl("", Validators.required));
      this.form.addControl("codCe", new FormControl("", Validators.required));
      this.form.addControl(
        "documento",
        new FormControl("", Validators.required)
      );

      this.getCombos();
    } else {
      this.form.addControl("esActa", new FormControl(true));
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
      .pipe(map((x) => x.body));
    let gp = this.formatServices.obtenerGenereales(2).pipe(map((x) => x.body));
    let ce = this.formatServices.obtenerGenereales(3).pipe(map((x) => x.body));

    forkJoin([ceco, gp, ce]).subscribe((result) => {
      this.cecoData = result[0];
      this.gpData = result[1];
      this.ceData = result[2];
      this.loading = false;
    });
  }

  onSubmit() {
    if (!this.loading && this.form.valid) {
      this.loading = true;
      if (this.data?.data) {
        this.dialogAddFormatoService
          .agregarFormato({ ...this.data?.data, ...this.form.value })
          .subscribe(() => {
            this.dialogRef.close();
          });
      } else {
        this.trimFields();
        this.dialogAddFormatoService
          .agregarFormato(this.trimFields())
          .subscribe((response) => {
            this.router
              .navigateByUrl(
                "/admin/formatos/formato-dinamico/" + response.body.id
              )
              .then(() => {
                this.dialogRef.close();
              });
          });
      }
    }
  }

  private isEdit(): void {
    if (this.data?.data) {
      const { codCe, codCeco, codGp, idTipoServicio, nombre, documento } =
        this.data?.data;
      this.form.patchValue({
        codCe,
        codCeco,
        codGp,
        idTipoServicio,
        nombre,
        documento,
      });
      this.form.controls["codCeco"].disable();
      this.form.controls["codGp"].disable();
      this.form.controls["codCe"].disable();
      this.form.controls["idTipoServicio"].disable();
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
