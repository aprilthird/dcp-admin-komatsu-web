import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ParamsPagination } from "app/core/types/http.types";
import { Pagination } from "app/core/types/list.types";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

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
    estado?: number | 1;
    tipo?: number;
    fechaIni?: any | "";
    fechaFin?: any | "";
    codigo: string | "";
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
  },
};

@Injectable({
  providedIn: "root",
})
export class TiposServiciosService {
  _serviceTypes: BehaviorSubject<any> = new BehaviorSubject(null);
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

  getServiceType(
    { page, pageSize }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): Observable<any[]> {
    let currentFilter;

    if (!page) {
      currentFilter = { ...getInboxParams };
    } else {
      currentFilter = {
        ...getInboxParams,
        page,
        pageSize,
      };
    }
    return this._httpClient
      .get<any[]>(environment.apiUrl + "/Administracion/ObtenerTipoServicios", {
        page,
        pageSize,
        ...currentFilter,
      })
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
          this._serviceTypes.next(resp.body);
        })
      );
  }

  postServiceType(data): Observable<any> {
    const endpoint = environment.apiUrl + "/Administracion/CrudTipoServicio";
    return this._httpClient.post(endpoint, data);
  }
}
