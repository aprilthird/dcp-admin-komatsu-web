import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ListadoService } from "app/projects/dcp/formatos/listado/listado.services";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { ActivitiesService } from "../../activities.service";
import { FilterI } from "../../../../../shared/models/filters-model";

@Component({
  selector: "app-filter-dialog",
  templateUrl: "./filter-dialog.component.html",
  styleUrls: ["./filter-dialog.component.scss"],
})
export class FilterDialogComponent implements OnInit {
  filters = Filters;

  form: FormGroup;
  loading: boolean;
  modelosOpt: any;
  actividadOpt: any;
  equipoOpt: any;
  filterService: FilterI;

  constructor(
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<FilterDialogComponent>,
    private serviceAct: ActivitiesService,
    private listadoService: ListadoService
  ) {
    this.form = this.fb.group({
      modelo: new FormControl(""),
      equipo: new FormControl(""),
      actividad: new FormControl(""),
      tipo_solicitud: new FormControl(""),
      estados: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.getFilters();
    //this.getInboxes();
  }

  /*getInboxes(): void {
    this.loading = true;
    let equipo = this.serviceAct.getList(2).pipe(map((x: any) => x.body.data));
    let modelos = this.serviceAct.getList(5).pipe(map((x: any) => x.body.data));
    let c_act = this.serviceAct.getList(7).pipe(map((x: any) => x.body.data));

    forkJoin([equipo, modelos, c_act]).subscribe((result: any) => {
      this.equipoOpt = result[0];
      this.modelosOpt = result[1];
      this.actividadOpt = result[2];
      this.loading = false;
    });
  }*/

  applyFilters(): void {
    this.listadoService
      .getFormatos({
        idClaseActividad: this.form.controls["actividad"].value,
        estado: this.form.controls["estados"].value,
      })
      .subscribe((resp) => {
        this.listadoService._filter.next(this.form.value);
        this.matdialigRef.close();
      });
  }

  wipeFilters(): void {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key).setValue("");
      this.listadoService._filter.next(null);
    });
  }

  getFilters(): void {
    this.listadoService._filter.subscribe((resp) => {
      this.filterService = resp;
      if (this.filterService) {
        this.setFilter(resp);
      }
    });
  }

  setFilter(filter: FilterI): void {
    this.form.controls["modelo"].setValue(filter.modelo);
    this.form.controls["equipo"].setValue(filter.equipo);
    this.form.controls["actividad"].setValue(filter.actividad);
    this.form.controls["estado"].setValue(filter.estado);
  }
}

const Filters = {
  estados: [
    {
      id: 1,
      name: "Activo",
    },
    {
      id: 0,
      name: "Inactivo",
    },
  ],
};
