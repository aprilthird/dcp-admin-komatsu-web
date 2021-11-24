import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  Activity,
  Asignaciones,
} from "app/projects/dcp/fake-db/activities/activity-fake-db";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";

//SERVICES
import { ActivitiesService } from "../../activities.service";

import { Activity as ActivityI } from "../../models/activities-model";

@Component({
  selector: "activity-add-edit",
  templateUrl: "./activity-add-edit.component.html",
  styleUrls: ["./activity-add-edit.component.scss"],
})
export class ActivityAddEditComponent implements OnInit {
  service_orders = ServiceOrders;
  pe_items = PE;
  isEdit: boolean;
  idActivity: number;
  isLoading: boolean = true;
  tipo_mantenimientos = tipo_mantenimientos;
  tipo_solicitudes = tipo_solicitudes;
  loadLoading: boolean;

  form: FormGroup = this.fb.group({
    cliente: new FormControl(""),
    equipo: new FormControl(""),
    modelo: new FormControl(""),
    flota: new FormControl(""),
    tipo_equipo: new FormControl(""),
    actividad: new FormControl(""),
    tipo_mantenimiento: new FormControl(""),
    bahia_asignada: new FormControl(""),
    tipo_solicitud: new FormControl(""),
    descripcion_actividad: new FormControl(""),
    numero_bl: new FormControl(""),
    os: new FormControl(""),
    pe: new FormControl(""),
    fecha_estimada: new FormControl(""),
    duracion: new FormControl(""),
    fecha_real_inicio: new FormControl(""),
    fecha_real_fin: new FormControl(""),
    duracion_2: new FormControl(""),
    comentarios_tecnico: new FormControl(""),
  });
  clientsOpt: any[];
  equiposOpt: any[];
  bahiasOpt: any[];
  clase_actividadesOpt: any[];
  modelosOpt: any[];
  tipo_equiposOpt: any[];
  flotasOpt: any[];
  tipo_mttoOpt: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private serviceAct: ActivitiesService
  ) {
    this.getActivityId();
  }

  ngOnInit(): void {
    //this.getData();
    this.getInboxes();
  }

  private getActivityId() {
    this.activatedRoute.paramMap.subscribe((resp: any) => {
      if (resp.params.id) {
        this.isEdit = true;
        this.idActivity = Number(resp.params.id);
      }
    });
  }

  getInboxes(): void {
    let clients = this.serviceAct.getList(1).pipe(map((x: any) => x.body.data));
    let equipos = this.serviceAct.getList(2).pipe(map((x: any) => x.body.data));
    let t_e = this.serviceAct.getList(3).pipe(map((x: any) => x.body.data));
    let bahias = this.serviceAct.getList(4).pipe(map((x: any) => x.body.data));
    let modelos = this.serviceAct.getList(5).pipe(map((x: any) => x.body.data));
    let flotas = this.serviceAct.getList(6).pipe(map((x: any) => x.body.data));
    let c_act = this.serviceAct.getList(7).pipe(map((x: any) => x.body.data));

    forkJoin([clients, equipos, c_act, bahias, modelos, flotas, t_e]).subscribe(
      (result: any) => {
        this.clientsOpt = result[0];
        this.equiposOpt = result[1];
        this.clase_actividadesOpt = result[2];
        this.bahiasOpt = result[3];
        this.modelosOpt = result[4];
        this.flotasOpt = result[5];
        this.tipo_equiposOpt = result[6];
        this.isLoading = false;
      }
    );
  }

  getTipoMtto(idClaseActividad): void {
    this.serviceAct.getTipoMtto(8, idClaseActividad).subscribe((resp: any) => {
      console.log(resp);
      this.tipo_mttoOpt = resp.body.data;
    });
  }

  private getData(): void {
    this.activatedRoute.paramMap.forEach((param: any) => {
      if (param.params.id) {
        this.idActivity = param.params.id;
        this.isEdit = true;

        const currentActivity = Asignaciones.find(
          (x: Activity) => x.id === Number(this.idActivity)
        );

        Object.keys(this.form.value).forEach((x) => {
          console.log(this.form.value);
          this.form.controls[x].setValue(currentActivity[x]);
        });
      }
    });
  }

  addSingleActivity(): void {
    /*const params: ActivityI = {
      cliente: JSON.stringify(this.form.controls["cliente"].value),
      idEquipo: this.form.controls["equipo"].value,
      flota: Number(this.form.controls["flota"].value),
      equipo: this.form.controls["tipo_equipo"].value,
      idTipoMantenimiento: this.form.controls["tipo_mantenimiento"].value,
      idBahia: this.form.controls["bahia_asignada"].value,
      idTipoSolicitud: this.form.controls["tipo_solicitud"].value,
      descripcion: this.form.controls["descripcion_actividad"].value,
      nbl: this.form.controls["numero_bl"].value,
      nos: "xxx",
      npe: "yyy",
      idCliente: this.form.controls["cliente"].value,
      idActividad: this.form.controls["actividad"].value,
      modelo: 10,
    };*/
    this.loadLoading = true;
    this.serviceAct.postCargaIndividual(this.getParams()).subscribe((resp) => {
      this.loadLoading = false;
      this.router.navigate(["/admin/actividades/list"]);
    });
  }

  removeOS(index: number): void {
    this.service_orders.splice(index, 1);
  }

  addOS(): void {
    if (this.service_orders.length === 1) {
      this.service_orders.push({
        id: this.service_orders.length + 1,
        value: "",
      });
    }
  }

  removePE(index: number): void {
    this.pe_items.splice(index, 1);
  }

  addPE(): void {
    if (this.pe_items.length === 1) {
      this.pe_items.push({
        id: this.pe_items.length + 1,
        value: "",
      });
    }
  }

  saveActivity(): void {
    this.loadLoading = true;
    this.serviceAct.postCargaIndividual(this.getParams()).subscribe((resp) => {
      console.log("resp post activity ", resp);
      this.loadLoading = false;
      this.router.navigate(["/admin/actividades/list"]);
    });
  }

  createActivity(): void {
    this.serviceAct.addNewActivity({
      id: Asignaciones.length,
      estado: "Sin empezar",
      ...this.form.value,
    });

    this.router.navigate(["/admin/actividades/list"]);
  }

  getParams(): any {
    const params: ActivityI = {
      cliente: JSON.stringify(this.form.controls["cliente"].value),
      idEquipo: this.form.controls["equipo"].value,
      flota: Number(this.form.controls["flota"].value),
      equipo: this.form.controls["tipo_equipo"].value,
      idTipoMantenimiento: this.form.controls["tipo_mantenimiento"].value,
      idBahia: this.form.controls["bahia_asignada"].value,
      idTipoSolicitud: this.form.controls["tipo_solicitud"].value,
      descripcion: this.form.controls["descripcion_actividad"].value,
      nbl: this.form.controls["numero_bl"].value,
      nos: "xxx",
      npe: "yyy",
      idCliente: this.form.controls["cliente"].value,
      idActividad: this.form.controls["actividad"].value,
      modelo: 10,
      visible: true,
      activo: true,
      actividad: "actividad",
      nombre: "nombre",
    };
    if ((this.isEdit = true)) {
      params["id"] = this.idActivity;
    } else {
      params["id"] = 0;
    }

    return params;
  }
}

const ServiceOrders = [
  {
    id: 1,
    value: "876HGJGU7G",
  },
];

const PE = [
  {
    id: 1,
    value: "DSD8S9F797",
  },
];

const tipo_mantenimientos = [
  {
    id: 1,
    name: "PS01",
  },
  {
    id: 2,
    name: "PS02",
  },
];

const tipo_solicitudes = [
  {
    id: 1,
    name: "Plan",
  },
];
