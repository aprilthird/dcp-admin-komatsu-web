import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ParamsPagination } from "app/core/types/http.types";
import { Pagination } from "app/core/types/list.types";
import { environment } from "environments/environment";
import moment from "moment";
import { BehaviorSubject, Observable, timer } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";

interface GetInbox {
  page: number;
  pageSize: number;
  offset: number;
  next: number;
  filter: {
    id: number;
    idUsuario: number;
    dni: string;
    nombre: string;
    estado?: number;
    tipo?: number;
    fechaInicio?: any;
    fechaFin?: any;
    codigo: string;
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
    dni: "",
    nombre: "",
    codigo: "",
    fechaFin: moment().format("yyyy-MM-DD"),
    fechaInicio: moment().subtract(90, "days").format("yyyy-MM-DD"),
  },
};

interface DateRange {
  fechaFin: Date;
  fechaInicio: Date;
}
@Injectable({
  providedIn: "root",
})
export class TiposServiciosService {
  _serviceTypes: BehaviorSubject<any> = new BehaviorSubject(null);
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

  constructor(private _httpClient: HttpClient) {}

  get serviceTypes$(): Observable<any> {
    return this._serviceTypes.asObservable();
  }

  set serviceTypes$(data) {
    this._serviceTypes.next(data);
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  get dateRage$(): Observable<DateRange> {
    return this._rangeDate.asObservable();
  }

  set dateRage$(dateRange) {
    this._rangeDate.next(dateRange);
  }

  getServiceType(
    { page, pageSize }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): Observable<any[]> {
    let currentFilter;

    currentFilter = {
      ...getInboxParams,
      filter: this._rangeDate.getValue(),
      page,
      pageSize,
    };
    return this._httpClient
      .post<any[]>(
        environment.apiUrl + "/Administracion/ObtenerTipoServicios",
        {
          page,
          pageSize,
          ...currentFilter,
        }
      )
      .pipe(
        debounceTime(1000),
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
          this._serviceTypes.next(resp.body.data);
        })
      );
  }

  postServiceType(data): Observable<any> {
    const endpoint = environment.apiUrl + "/Administracion/CrudTipoServicio";
    return this._httpClient.post(endpoint, data);
  }
}
