import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  PaginationResponse,
  ParamsPagination,
} from "app/core/types/http.types";
import { Pagination } from "app/core/types/list.types";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import {
  DispositivoI,
  DispositivoResponse,
  DispositivoResponseI,
} from "./dispositivo-model";

@Injectable({
  providedIn: "root",
})
export class DispositivosService {
  dispositivos: BehaviorSubject<DispositivoI[]> = new BehaviorSubject(null);
  _pagination: BehaviorSubject<any> = new BehaviorSubject({
    length: 0,
    size: 10,
    page: 0,
    lastPage: 0,
    startIndex: 0,
    endIndex: 0,
  });

  constructor(private http: HttpClient) {}

  get dispositivos$(): Observable<DispositivoI[]> {
    return this.dispositivos.asObservable();
  }

  set dispositivos$(client: any) {
    this.dispositivos.next(client);
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  postDispositivo(dispositivo): Observable<any> {
    const endpoint = "/Administracion/CrudDispositivos/" + 0;
    return this.http.post<PaginationResponse<DispositivoI[]>>(
      "https://development-kmp.ws.solera.pe" + endpoint,
      dispositivo
    );
  }

  getDispositivo(
    { page, pageSize }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): Observable<PaginationResponse<DispositivoI[]>> {
    return this.http
      .get<PaginationResponse<DispositivoI[]>>(
        "https://development-kmp.ws.solera.pe" +
          "/Administracion/ObtenerGenerales/10"
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
          this.dispositivos.next(response.body.data);
        })
      );
  }

  getDispositivoFake(
    { page, pageSize }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): PaginationResponse<DispositivoResponseI[]> {
    this._pagination.next({
      ...this._pagination.getValue(),
      page,
      size: pageSize,
      length: DispositivoResponse.body.length,
      lastPage: Math.ceil(
        DispositivoResponse.body.length / this._pagination.getValue().size
      ),
    });
    this.dispositivos.next(DispositivoResponse.body);
    return DispositivoResponse;
  }
}
