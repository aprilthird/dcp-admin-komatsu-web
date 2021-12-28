import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ParamsPagination } from "app/core/types/http.types";
import { Pagination } from "app/core/types/list.types";
import { Response } from "app/shared/models/general-model";
import { environment } from "environments/environment";
import moment from "moment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Activity as ActivityI } from "./models/activities-model";
let startDate = moment();

//FILTER CONFIG

interface GetInbox {
  page: number | 0;
  pageSize: number | 10;
  offset: number | 0;
  next: number | 0;
  filter: {
    id: number;
    idUsuario: number;
    dni: string;
    nombre: string;
    estado?: string | "";
    idTipo?: number;
    tipo?: number;
    fechaInicio?: any | "";
    fechaFin?: any | "";
    codigo: string | "";
    os?: string | "";
  };
}

const getInboxParams: GetInbox = {
  page: 0,
  pageSize: 10,
  offset: 0,
  next: 0,
  filter: {
    id: 0,
    idUsuario: 0,
    idTipo: 0,
    estado: "",
    dni: "",
    nombre: "",
    codigo: "",
    fechaFin: startDate.format("yyyy-MM-DD"),
    fechaInicio: startDate.subtract(14, "days").format("yyyy-MM-DD"),
    os: "",
  },
};

@Injectable({
  providedIn: "root",
})
export class ActivitiesService {
  preloadedFormats: BehaviorSubject<any> = new BehaviorSubject(null);
  _activities: BehaviorSubject<any> = new BehaviorSubject(null);
  _idActivityFormat: BehaviorSubject<number> = new BehaviorSubject(null);
  _idFormat: BehaviorSubject<number> = new BehaviorSubject(null);

  _rangeDate: BehaviorSubject<any> = new BehaviorSubject({
    fechaInicio: getInboxParams.filter.fechaInicio,
    fechaFin: getInboxParams.filter.fechaFin,
  });

  _pagination: BehaviorSubject<any> = new BehaviorSubject({
    length: 0,
    size: 10,
    page: 0,
    lastPage: 0,
    startIndex: 0,
    endIndex: 0,
  });

  constructor(private http: HttpClient) {}

  get preloadedFormats$(): Observable<any> {
    return this.preloadedFormats.asObservable();
  }

  set preloadedFormats$(data) {
    this.preloadedFormats.next(data);
  }

  get activities$(): Observable<any> {
    return this._activities.asObservable();
  }

  set activities$(data) {
    this._activities.next(data);
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  addNewActivity(newData) {
    let data: any = this._activities.asObservable();
    this._activities.next([newData, ...data.source.value]);
  }

  getList(tipo): Observable<any[]> {
    return this.http.post<any[]>(
      environment.apiUrl + "/Administracion/BandejaMaestrosPaginado",
      {
        ...getInboxParams,
        filter: {
          ...getInboxParams.filter,
          tipo: tipo,
        },
      }
    );
  }

  getTipoMtto(tipo, idClaseActividad?): Observable<any[]> {
    console.log("id clase actividad ", idClaseActividad);
    return this.http.post<any[]>(
      environment.apiUrl + "/Administracion/BandejaMaestrosPaginado",
      {
        ...getInboxParams,
        filter: {
          ...getInboxParams.filter,
          tipo: tipo,
          idClaseActividad: idClaseActividad,
        },
      }
    );
  }

  getActivities(
    { page, pageSize, idTipo, estado, os }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): Observable<any[]> {
    let currentFilter;

    currentFilter = {
      ...getInboxParams,
      filter: { ...this._rangeDate.getValue(), idTipo, estado, os },
      page,
      pageSize,
    };
    return this.http
      .post<any[]>(
        environment.apiUrl + "/Actividades/BandejaInformesPaginado",
        {
          page,
          pageSize,
          ...currentFilter,
        }
      )
      .pipe(
        tap((resp: any) => {
          this._pagination.next({
            ...this._pagination.getValue(),
            page,
            size: pageSize,
            length: resp.body.totalRecords,
            lastPage: Math.ceil(
              resp.body.totalRecords / this._pagination.getValue().size
            ),
          });
          this._activities.next(resp.body.data);
        })
      );
  }

  postActaConformidad(data: ActaConformidad): Observable<Response> {
    return this.http.post<Response>(
      environment.apiUrl + "/Mantenimiento/AgregarActaConformidad",
      data
    );
  }

  getActaConformidad(idActividadFormato: number): Observable<Response> {
    return this.http.get<Response>(
      environment.apiUrl + `/Mantenimiento/ObtenerActa/${idActividadFormato}`
    );
  }

  printPdf(idActividadFormato): Observable<any> {
    const endpoint =
      environment.apiUrl + "/Reportes/GenerarPdf/" + idActividadFormato;
    return this.http.get<Response>(endpoint);
  }
}

interface ActaConformidad {}
