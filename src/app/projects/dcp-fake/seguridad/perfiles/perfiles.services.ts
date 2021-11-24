import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pagination } from "app/core/types/list.types";
import { PaginationResponse, ParamsPagination } from 'app/core/types/http.types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators';
import { Perfil } from './perfiles.types';

@Injectable({providedIn: 'root'})
export class PerfilesService {
  
  _perfiles: BehaviorSubject<Perfil[]> = new BehaviorSubject(null);
  _pagination: BehaviorSubject<any> = new BehaviorSubject({
    length: 0,
    size: 10,
    page: 0,
    lastPage: 0,
    startIndex: 0,
    endIndex: 0,
  });
  
  constructor(private _httpClient:HttpClient) { }
  

  get perfiles$(): Observable<Perfil[]> {
    return this._perfiles.asObservable();
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  /**
   * Obtener el listado de perfiles
   */
   getPerfiles(
    { page, pageSize, ...filter }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): Observable<PaginationResponse<Perfil[]>> {
    return this._httpClient
      .get<PaginationResponse<Perfil[]>>(
        environment.apiUrl + "/Seguridad/ObtenerRoles/0",
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
          this._perfiles.next(response.body);
        })
      );
  }

  deletePerfil(data):Observable<any> {
    return this._httpClient.post<any>(environment.apiUrl + '/Seguridad/GuardarRol', data);
  }
}