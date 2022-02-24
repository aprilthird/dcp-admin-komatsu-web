import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Formato } from "app/core/types/formatos.types";
import {
  PaginationResponse,
  ParamsPagination,
} from "app/core/types/http.types";
import { Pagination } from "app/core/types/list.types";
import { Response } from "app/shared/models/general-model";
import { environment } from "environments/environment";
import moment from "moment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { FilterI } from "../../../../shared/models/filters-model";

@Injectable({
  providedIn: "root",
})
export class ListadoService {
  _formatos: BehaviorSubject<any[]> = new BehaviorSubject(null);
  _filter: BehaviorSubject<any> = new BehaviorSubject(null);
  _isFilter: BehaviorSubject<boolean> = new BehaviorSubject(false);
  _pagination: BehaviorSubject<any> = new BehaviorSubject({
    length: 0,
    size: 10,
    page: 0,
    lastPage: 0,
    startIndex: 0,
    endIndex: 0,
  });

  constructor(private _httpClient: HttpClient) {}

  get formatos$(): Observable<any[]> {
    return this._formatos.asObservable();
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  get filters$(): Observable<FilterI> {
    return this._filter.asObservable();
  }

  /**
   * Obtener el listado de usuarios
   */
  getFormatos(
    {
      page,
      pageSize,
      idClaseActividad,
      estado,
      codCeco,
      codGp,
      codCe,
    }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): Observable<PaginationResponse<Formato[]>> {
    if ((!codCeco && !codGp && !codCe) || (codCeco && codGp && codCe === ""))
      this._isFilter.next(false);
    else this._isFilter.next(true);
    this._filter.next({ codCeco, codGp, codCe });
    return this._httpClient
      .post<PaginationResponse<Formato[]>>(
        environment.apiUrl + "/Core/ObtenerFormatosPaginado",
        {
          page,
          pageSize,
          filter: {
            idClaseActividad,
            estado,
            fechaInicio: moment().subtract(5, "years").format("yyyy-MM-DD"),
            fechaFin: moment().format("yyyy-MM-DD"),
            codCeco,
            codGp,
            codCe,
          },
        }
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
          this._formatos.next(response.body.data);
        })
      );
  }

  setDefaultFormatActa(id: number): Observable<Response> {
    const endpoint = environment.apiUrl + "/Core/ActivarActa/" + id;
    return this._httpClient.get<Response>(endpoint);
  }
}
