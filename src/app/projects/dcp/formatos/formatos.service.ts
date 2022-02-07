import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { Response } from "app/shared/models/general-model";

@Injectable({
  providedIn: "root",
})
export class FormatosService {
  _idFormulario: BehaviorSubject<number> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) {}

  validateSection(data): Observable<Response> {
    const endpoint = environment.apiUrl + "/Mantenimiento/ValidarSeccion";
    return this._httpClient.post<Response>(endpoint, data);
  }

  validateFormat(data): Observable<Response> {
    const endpoint = environment.apiUrl + "/Mantenimiento/ValidarFormato";
    return this._httpClient.post<Response>(endpoint, data);
  }

  postDocument(data): Observable<Response> {
    const endpoint = environment.apiUrl + "/Actividades/CrudGaleria";
    return this._httpClient.post<Response>(endpoint, data);
  }

  getGallery(idActividadFormato): Observable<Response> {
    const endpoint =
      environment.apiUrl + "/Actividades/ObtenerGaleria/" + idActividadFormato;
    return this._httpClient.get<Response>(endpoint);
  }

  obtenerGenereales(code: number): Observable<Response> {
    const endpoint =
      environment.apiUrl + "/Administracion/ObtenerGenerales/" + code;
    return this._httpClient.get<Response>(endpoint);
  }
}
