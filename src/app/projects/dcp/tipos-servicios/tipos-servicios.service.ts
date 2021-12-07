import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TiposServiciosService {
  constructor(private _httpClient: HttpClient) {}

  getServiceTypes(): Observable<any> {
    return this._httpClient.get(
      environment.apiUrl + "/Administracion/ObtenerTipoServicios"
    );
  }
}
