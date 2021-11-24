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
  DocumentoI,
  DocumentoResponse,
  DocumentoResponseI,
} from "./documento-model";
import { getInboxParams } from "../maestro-model";
import { environment } from "environments/environment";
import { MaestrosService } from "../maestros.service";

@Injectable({
  providedIn: "root",
})
export class DocumentosService {
  documentos: BehaviorSubject<DocumentoI[]> = new BehaviorSubject(null);
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

  get documentos$(): Observable<DocumentoI[]> {
    return this.documentos.asObservable();
  }

  set documentos$(client: any) {
    this.documentos.next(client);
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  postDocumento(documento): Observable<any> {
    const endpoint = "/api/Administracion/GestionDocumentaria";
    return this.http.post<PaginationResponse<DocumentoI[]>>(
      "https://development-kmp.ws.solera.pe" + endpoint,
      documento
    );
  }

  getDocumentos(
    { page, pageSize, nombre }: ParamsPagination | any = {
      page: 0,
      pageSize: 10,
    }
  ): Observable<PaginationResponse<DocumentoI[]>> {
    let currentFilter;
    getInboxParams.filter.tipo = 8;
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
      .post<PaginationResponse<any[]>>(
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

          this.documentos.next(response.body.data);
          this.maestroService.currentTableData.next(response.body.data);
        })
      );
  }
}
