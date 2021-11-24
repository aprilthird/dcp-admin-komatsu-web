import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "environments/environment";
import {
  PaginationResponse,
  ParamsPagination,
} from "app/core/types/http.types";
import { Pagination } from "app/core/types/list.types";
import { Usuario } from "app/core/types/user.types";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AsignarFormatoService {
  _usuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject(null);
  _pagination: BehaviorSubject<any> = new BehaviorSubject({
    length: 0,
    size: 10,
    page: 0,
    lastPage: 0,
    startIndex: 0,
    endIndex: 0,
  });

  constructor(private _httpClient: HttpClient) {}

  get usuarios$(): Observable<Usuario[]> {
    return this._usuarios.asObservable();
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  asignarFormato(data): Observable<any> {
    return this._httpClient.post<any>(
      environment.apiUrl + "/Mantenimiento/GenerarOrdenAsignacion/",
      data
    );
  }

  /**
   * Obtener el listado de usuarios
   */
  getUsuarios(
    { page, pageSize, ...filter }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): Observable<PaginationResponse<Usuario[]>> {
    return this._httpClient
      .post<PaginationResponse<Usuario[]>>(
        environment.apiUrl + "/Seguridad/BandejaUsuariosPaginado",
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
          this._usuarios.next(response.body.data);
        })
      );
  }
}
