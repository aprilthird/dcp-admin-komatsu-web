import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ParamsPagination } from "app/core/types/http.types";
import { Pagination } from "app/core/types/list.types";
import { Response } from "app/shared/models/general-model";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { getInboxParams } from "./models/activity-filter";

@Injectable({
  providedIn: "root",
})
export class ActivitiesService {
  _activities: BehaviorSubject<any> = new BehaviorSubject(null);
  _idFormat: BehaviorSubject<number> = new BehaviorSubject(null);

  _rangeDate: BehaviorSubject<any> = new BehaviorSubject({
    fechaInicio: getInboxParams.filter.fechaInicio,
    fechaFin: getInboxParams.filter.fechaFin,
  });
  _inputFilter: BehaviorSubject<any> = new BehaviorSubject({
    codigo: "",
    idTipoServicio: 0,
    idEstado: 0,
  });
  _isFilter: BehaviorSubject<boolean> = new BehaviorSubject(false);

  _pagination: BehaviorSubject<any> = new BehaviorSubject({
    length: 0,
    size: 10,
    page: 0,
    lastPage: 0,
    startIndex: 0,
    endIndex: 0,
  });

  constructor(private http: HttpClient) {}

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
    {
      page,
      pageSize,
      idTipoServicio = 0,
      idEstado = 0,
      codigo = "",
      fechaInicio = getInboxParams.filter.fechaInicio,
      fechaFin = getInboxParams.filter.fechaFin,
    }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): Observable<any[]> {
    if (idTipoServicio || idEstado !== 0 || codigo !== "")
      this._isFilter.next(true);
    else this._isFilter.next(false);
    this._inputFilter.next({
      idTipoServicio,
      idEstado,
      codigo,
    });

    this._rangeDate.next({
      fechaInicio,
      fechaFin,
    });
    let currentFilter = {
      ...getInboxParams,
      filter: {
        ...getInboxParams.filter,
        fechaInicio,
        fechaFin,
        idTipoServicio,
        idEstado,
        codigo,
      },
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

  postActaConformidad(data): Observable<Response> {
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

  getStatus(type: string): Observable<any> {
    const endpoint =
      environment.apiUrl + "/Administracion/ObtenerEstados/" + type;
    return this.http.get<Response>(endpoint);
  }

  getDataActa(idActa: number = 0): Observable<any> {
    const endpoint =
      environment.apiUrl + "/Core/ObtenerParametrosActa/" + idActa;
    return this.http.get<Response>(endpoint);
  }
}
