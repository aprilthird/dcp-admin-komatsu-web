import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Formato } from "app/core/types/formatos.types";
import {
  PaginationResponse,
  ParamsPagination,
} from "app/core/types/http.types";
import { Pagination } from "app/core/types/list.types";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ListadoService {
  _formatos: BehaviorSubject<any[]> = new BehaviorSubject(null);
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

  /**
   * Obtener el listado de usuarios
   */
  getFormatos(
    { page, pageSize, ...filter }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): Observable<PaginationResponse<Formato[]>> {
    return this._httpClient
      .post<PaginationResponse<Formato[]>>(
        environment.apiUrl + "/Core/ObtenerFormatosPaginado",
        {
            page,
            pageSize,
            filter,
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
}
