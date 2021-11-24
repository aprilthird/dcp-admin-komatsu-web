import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({providedIn: 'root'})
export class DialogAddPerfilService {
  constructor(private _httpClient: HttpClient) { }

  addUsuario(data):Observable<any> {
    return this._httpClient.post(environment.apiUrl + '/Seguridad/GuardarRol', data);
  }
  
}