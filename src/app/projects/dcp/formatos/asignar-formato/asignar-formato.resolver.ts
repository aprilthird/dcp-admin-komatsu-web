import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { EditarFormatoService } from "../editar-formato/editar-formato.service";

@Injectable({
  providedIn: "root",
})
export class AsignarFormatoResolver implements Resolve<boolean> {
  constructor(private _editarFormatoService: EditarFormatoService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return forkJoin([
      this._editarFormatoService.getFormato({id: route.params.id}),
    ])
  }
}
