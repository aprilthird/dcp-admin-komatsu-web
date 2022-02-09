import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ParamI } from "app/shared/models/formatos";
import { UiDialogsComponent } from "app/shared/ui/ui-dialogs/ui-dialogs.component";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

//SERVICES
import { ActivitiesService } from "../activities.service";

@Component({
  selector: "app-acta-conformidad",
  templateUrl: "./acta-conformidad.component.html",
  styleUrls: ["./acta-conformidad.component.scss"],
})
export class ActaConformidadComponent implements OnInit {
  isLoading = true;
  isEdit = false;
  loadLoading = false;
  idActa: number;
  form: FormGroup = this.fb.group({
    lugarTrabajo: ["", Validators.required],
    provincia: [""],
    contacto: [""],
    servicio: [""],
    fecha: [""],
    fechaActa: [""],
    equipo: ["", Validators.required],
    marca: ["", Validators.required],
    serie: ["", Validators.required],
    modelo: ["", Validators.required],
    cliente: ["", [Validators.required]],
    os: ["", Validators.required],
    nequipo: [],
    horasKm: [""],
    placas: [""],
    odometro: [""],
    motorMarca: [""],
    motorSerie: ["", Validators.required],
    motorModelo: ["", Validators.required],
    motorHorasKm: [""],
    motorCpl: [""],
    motorCodEdm: [""],
    motorOdometro: [""],
    trabajos: [""],
    id: [0],
  });
  savingData: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isFieldLoading: boolean;
  parameters: ParamI[] = [];

  constructor(
    private fb: FormBuilder,
    private activitiesService: ActivitiesService,
    private activeRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.getIdAcataConformidad();
  }

  ngOnInit(): void {
    this.getDataActa();
  }

  private getIdAcataConformidad(): void {
    this.activeRoute.params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((params) => {
        this.idActa = Number(params["idActividad"]);
        this.getActa();
      });
  }

  private getActa(): void {
    this.activitiesService
      .getActaConformidad(this.idActa)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((resp) => {
        this.setFormValues(resp.body);

        this.isLoading = false;
      });
  }

  getDataActa(): void {
    this.activitiesService
      .getDataActa(this.idActa)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((resp) => {
        this.parameters = resp.body;
      });
  }

  postActa(): void {
    this.savingData = true;
    this.form.controls["fechaActa"].setValue(this.form.controls["fecha"].value);
    this.form.controls["cliente"].enable();
    this.form.controls["os"].enable();
    if (this.isEdit) {
      this.form.addControl("idActividadFormato", new FormControl(this.idActa));
    }
    this.activitiesService
      .postActaConformidad({ ...this.form.value, parametros: this.parameters })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        () => {
          this.savingData = false;
          //this.router.navigate(["/admin/informes/list"]);
        },
        (err) => {
          this.matDialog.open(UiDialogsComponent, {
            data: {
              title: "Error",
              message: err?.error
                ? err?.error
                : "Error al guardar el acta, verifique su conexión a internet!",
            },
            width: "500px",
          });
          this.savingData = false;
        }
      );
  }

  private setFormValues(data): void {
    if (data && data?.cliente) {
      this.form.controls["cliente"].disable();
      this.form.controls["os"].disable();

      this.isEdit = true;
      const {
        cliente,
        os,
        lugarTrabajo,
        provincia,
        contacto,
        servicio,
        fecha,
        fechaActa,
        equipo,
        marca,
        serie,
        modelo,
        nequipo,
        horasKm,
        placas,
        odometro,
        motorMarca,
        motorSerie,
        motorModelo,
        motorHorasKm,
        motorCpl,
        motorCodEdm,
        motorOdometro,
        trabajos,
        id,
      } = data;

      this.form.setValue({
        cliente,
        os,
        lugarTrabajo,
        provincia,
        contacto,
        servicio,
        fecha,
        fechaActa,
        equipo,
        marca,
        serie,
        modelo,
        nequipo,
        horasKm,
        placas,
        odometro,
        motorMarca,
        motorSerie,
        motorModelo,
        motorHorasKm,
        motorCpl,
        motorCodEdm,
        motorOdometro,
        trabajos,
        id,
      });
    }
  }

  updateDynamicFields(e): void {
    this.parameters.map((param) => {
      if (e.id === param.id) param.valor = e.valor;
    });
  }
}
