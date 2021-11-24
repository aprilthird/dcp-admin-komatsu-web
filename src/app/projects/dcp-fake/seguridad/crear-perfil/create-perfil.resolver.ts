import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { CrearPerfilService } from './create-perfil.service';

@Injectable({ providedIn: 'root' })
export class CrearPerfilResolver implements Resolve<any> {
  constructor(private _createPerfilService:CrearPerfilService) {

  }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin([
      this._createPerfilService.getObtenerMenu(route.params.id)
    ]);
  }
}