import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormatosService {
  constructor(private _httpClient: HttpClient) {}

  validateSection(data): Observable<any> {
    const endpoint = environment.apiUrl + "/Mantenimiento/ValidarSeccion";
    return this._httpClient.post<any>(endpoint, data);
  }

  validateFormat(data): Observable<any> {
    const endpoint = environment.apiUrl + "/Mantenimiento/ValidarFormato";
    return this._httpClient.post<any>(endpoint, data);
  }

  postPhoto(data): Observable<any> {
    const endpoint = environment.apiUrl + "/Actividades/CrudGaleria";
    return this._httpClient.post<any>(endpoint, data);
  }

  getGallery(idActividadFormato): Observable<any> {
    const endpoint =
      environment.apiUrl + "/Actividades/ObtenerGaleria/" + idActividadFormato;
    return this._httpClient.get<any>(endpoint);
  }

  getSinglePicture(url: string): Observable<string> {
    return this._httpClient.get<string>(url);
  }

  obtenerGenereales(code: number): Observable<any> {
    const endpoint =
      environment.apiUrl + "/Administracion/ObtenerGenerales/" + code;
    return this._httpClient.get(endpoint);
  }
}
