import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { PerfilesService } from "../perfiles/perfiles.services";
import { CrearUsuarioService } from "./crear-usuario.service";

@Injectable({ providedIn: "root" })
export class CrearUsuarioResolver implements Resolve<any> {
  constructor(
    private _perfilesService: PerfilesService,
    private _crearUsuarioService: CrearUsuarioService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin([
      this._perfilesService.getPerfiles().pipe(
        tap((response) => {
          this._crearUsuarioService.perfiles = response.body;
        })
      ),
    ]);
  }
}
