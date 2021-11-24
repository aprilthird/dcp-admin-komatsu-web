import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { FilterDialogComponent } from "../actividades/filter/filter-dialog/filter-dialog.component";
import { DialogAddTipoServicioComponent } from "./dialog-add-tipo-servicio/dialog-add-tipo-servicio.component";

@Component({
  selector: "app-tipos-servicios",
  templateUrl: "./tipos-servicios.component.html",
  styleUrls: ["./tipos-servicios.component.scss"],
})
export class TiposServiciosComponent implements OnInit {
  isLoading = false;

  tipos_servicios$: any[] = tipos_servicios;
  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private _routeActived: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openFilter(): void {
    this.dialog.open(FilterDialogComponent, { width: "370px" });
  }

  clickNewTipoServicio() {
    const dialogRef = this.dialog.open(DialogAddTipoServicioComponent, {
      autoFocus: false,
      width: "376px",
    });
  }
}

const tipos_servicios = [
  {
    id: 1,
    tipo_servicio: "Evaluacion",
    icono: "Icono",
    fecha: "15-02-2021",
    modificado: "cmunoz",
  },
  {
    id: 2,
    tipo_servicio: "Evaluacion",
    icono: "Icono",
    fecha: "15-02-2021",
    modificado: "cmunoz",
  },
  {
    id: 3,
    tipo_servicio: "Evaluacion",
    icono: "Icono",
    fecha: "15-02-2021",
    modificado: "cmunoz",
  },
];

interface TipoServicioI {
  id: number;
  tipo_servicio: string;
  icono: string;
  fecha: string;
  modificado: string;
}
