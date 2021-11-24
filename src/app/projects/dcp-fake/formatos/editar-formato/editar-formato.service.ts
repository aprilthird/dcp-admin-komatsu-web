import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Formato,
  Grupo,
  Parametro,
  Seccion,
} from "app/core/types/formatos.types";
import { HttpResponse } from "app/core/types/http.types";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class EditarFormatoService {
  _formato: BehaviorSubject<Formato> = new BehaviorSubject<Formato>(null);
  _secciones: BehaviorSubject<Seccion[]> = new BehaviorSubject<Seccion[]>(null);
  _tipoDatos: BehaviorSubject<Parametro[]> = new BehaviorSubject<Parametro[]>(
    null
  );

  constructor(private _httpClient: HttpClient) {}

  get secciones$(): Observable<Seccion[]> {
    return this._secciones.asObservable();
  }

  get formato$(): Observable<Formato> {
    return this._formato.asObservable();
  }

  getFormato(idFormato): Observable<any> {
    return this._httpClient
      .get<any>(environment.apiUrl + "/Core/ObtenerFormato/" + idFormato )
      .pipe(
        tap((response) => {
          if (response && response.body) {
            this._formato.next(response.body.nombre);
          }
        })
      );
  }

  getObtenerFormatoCompleto(id):Observable<any> {
    return this._httpClient.get<any>(environment.apiUrl + '/Core/ObtenerFormatoCompleto/' + id);
  }

  datos(): any {
    return this._tipoDatos.getValue().map((e) => ({
      id: e.id,
      label: e.nombre,
    }));
  }

  /**
   * Obtener las secciónes de un formulario
   * @param idSeccion i
   * @returns
   */
  getSecciones({ idFormulario, reload = false }): Observable<any> {
    if (this._secciones.getValue() && !reload) return of(true);

    return this._httpClient
      .get<HttpResponse<Seccion[]>>(
        environment.apiUrl + "/Core/ObtenerSecciones/" + idFormulario
      )
      .pipe(
        tap((response) => {
          this._secciones.next(response.body);
        })
      );
  }

  getTipoDatos(): Observable<any> {
    if (this._tipoDatos.getValue()) return of(true);

    return this._httpClient
      .get<HttpResponse<Seccion[]>>(
        environment.apiUrl + "/Core/ObtenerParametros/0"
      )
      .pipe(
        tap((response) => {
          this._tipoDatos.next(response.body);
        })
      );
  }

  getGrupos(idSeccion): Observable<any> {
    return this._httpClient.get<HttpResponse<Grupo[]>>(
      environment.apiUrl + "/Core/ObtenerGrupos/" + idSeccion
    );
  }

  createSeccion(data): Observable<any> {
    return this._httpClient.post(
      environment.apiUrl + "/Core/GuardarSeccion",
      data
    );
  }

  createGrupo(data): Observable<HttpResponse<Grupo>> {
    return this._httpClient.post<any>(
      environment.apiUrl + "/Core/GuardarGrupo",
      data
    );
  }

  createDato(data): Observable<any> {
    return this._httpClient.post<any>(
      environment.apiUrl + "/Core/GuardarParametrosxGrupo",
      data
    );
  }
}
