import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  PaginationResponse,
  ParamsPagination,
} from "app/core/types/http.types";
import { Pagination } from "app/core/types/list.types";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { getInboxParams } from "../maestro-model";
import { MaestrosService } from "../maestros.service";
import { TipoEquipoI } from "./model-tipo-equipo";

@Injectable({
  providedIn: "root",
})
export class TipoEquiposService {
  tipo_equipos: BehaviorSubject<TipoEquipoI[]> = new BehaviorSubject(null);
  _pagination: BehaviorSubject<any> = new BehaviorSubject({
    length: 0,
    size: 10,
    page: 0,
    lastPage: 0,
    startIndex: 0,
    endIndex: 0,
  });

  constructor(
    private http: HttpClient,
    private maestroService: MaestrosService
  ) {}

  get tipo_equipos$(): Observable<TipoEquipoI[]> {
    return this.tipo_equipos.asObservable();
  }

  set tipo_equipos$(client: any) {
    this.tipo_equipos.next(client);
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  postTipoEquipo(equipo): Observable<any> {
    const endpoint = "/Administracion/CrudTipoEquipos";
    return this.http.post<PaginationResponse<TipoEquipoI[]>>(
      environment.apiUrl + endpoint,
      equipo
    );
  }

  getTipoEquipos(
    { page, pageSize, nombre }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): Observable<PaginationResponse<TipoEquipoI[]>> {
    let currentFilter;
    getInboxParams.filter.tipo = 3;
    getInboxParams.filter.nombre = nombre;

    if (!page) {
      currentFilter = { ...getInboxParams };
    } else {
      currentFilter = {
        ...getInboxParams,
        page,
        pageSize,
      };
    }
    return this.http
      .post<PaginationResponse<TipoEquipoI[]>>(
        environment.apiUrl + "/Administracion/BandejaMaestrosPaginado",
        { page, pageSize, ...currentFilter }
      )
      .pipe(
        tap((response) => {
          this._pagination.next({
            ...this._pagination.getValue(),
            page,
            size: pageSize,
            length: response.body.totalRecords,
            lastPage: Math.ceil(
              response.body.totalRecords / this._pagination.getValue().size
            ),
          });
          this.tipo_equipos.next(response.body.data);
          this.maestroService.currentTableData.next(response.body.data);
        })
      );
  }
}
