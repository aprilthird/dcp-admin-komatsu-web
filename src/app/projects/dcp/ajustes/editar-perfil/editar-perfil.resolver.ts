import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { EditarPerfilService } from "./editar-perfil.service";

@Injectable({ providedIn: 'root' })
export class EditarPerfilResolver implements Resolve<any> {
  constructor(private _editarPerfilService:EditarPerfilService) {

  }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin([
      this._editarPerfilService.getObtenerMenu(route.params.id)
    ]);
  }
}