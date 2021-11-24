import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, ReplaySubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Navigation } from "app/core/navigation/navigation.types";
import { environment } from "environments/environment";
import { PermissionService } from "../permission/permission.service";
import { Permission } from "../permission/permission.types";

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  private _navigation: ReplaySubject<Navigation> =
    new ReplaySubject<Navigation>(1);

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _permissionsServices: PermissionService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for navigation
   */
  get navigation$(): Observable<Navigation> {
    return this._navigation.asObservable();
  }

  loadLocalStorage(): Observable<Boolean> {
    this._navigation.next(JSON.parse(localStorage.getItem("navigation")));
    return of(true);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get all navigation data
   */
  get(): Observable<Navigation> {
    return this._httpClient
      .get<Navigation>(environment.apiUrl + "/Seguridad/ObtenerMenu")
      .pipe(
        tap((response: any) => {
          let nextNavigation = {
            compact: [],
            default: [],
            futuristic: [],
            horizontal: [],
          };

          //Objeto de permisos del usuario que se identificará por las rutas de los módulos
          let permissions: Permission = {};

          // Función permite la navegación de manera visual en la vista
          const getNavigation = (e) => {
            console.log(e.nombre, e.activo, e.nivel);
            if (!e.activo) return [];

            // Si la navegación tiene ruta se agrega como permiso a dicha ruta
            if (e.ruta) {
              permissions[`${e.ruta}`] = {};
              if (e.acciones && e.acciones.length > 0) {
                e.acciones.forEach((accion) => {
                  if (accion.activo)
                    permissions[`${e.ruta}`][`${accion.nombre}`] = true;
                });
              }
            }

            let subMenu = e.subMenu;

            if (subMenu.length > 0) {
              // Verificación si es una opción de movil
              subMenu = subMenu.filter((e) => !e.movil);
            }

            return {
              id: e.id,
              title: e.nombre,
              type: e.subMenu && e.subMenu.length > 0 ? "group" : "basic",
              icon: e.nivel === 0 ? e.icon : null,
              link: e.ruta || "/pagina-no-encontrada",
              ...(subMenu && subMenu.length > 0
                ? { children: subMenu.map((sub) => getNavigation(sub)) }
                : {}),
            };
          };

          nextNavigation.default = response.body.map((e) => getNavigation(e));
          nextNavigation.horizontal = response.body.map((e) =>
            getNavigation(e)
          );
          this._permissionsServices.updatPermissions$ = permissions;

          //nextNavigation.default.reverse();
          //nextNavigation.horizontal.reverse();

          localStorage.setItem("navigation", JSON.stringify(nextNavigation));
          localStorage.setItem("permissions", JSON.stringify(permissions));
        })
      );
  }
}
