import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({providedIn: 'root'})
export class DialogAddFormatoService {

  constructor(private _httpClient: HttpClient) { }

  agregarFormato(data):Observable<any> {
    return this._httpClient.post(environment.apiUrl + '/Core/GuardarFormato', data);
  }
}