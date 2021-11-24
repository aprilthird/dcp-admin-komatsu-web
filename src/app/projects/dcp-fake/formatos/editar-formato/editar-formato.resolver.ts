import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { EditarFormatoService } from "./editar-formato.service";

@Injectable({
  providedIn: "root",
})
export class EditarFormatoResolver implements Resolve<boolean> {
  constructor(private _editarFormatoService: EditarFormatoService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return forkJoin([
      this._editarFormatoService.getSecciones({ idFormulario: route.params.id }),
      this._editarFormatoService.getFormato(route.params.id),
      this._editarFormatoService.getTipoDatos(),
    ])
  }
}
