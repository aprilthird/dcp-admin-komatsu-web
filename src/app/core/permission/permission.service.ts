import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, ReplaySubject } from "rxjs";
import { Permission } from "./permission.types";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  private _permissions: BehaviorSubject<Permission> =
    new BehaviorSubject<Permission>(null);

  constructor() {}

  /**
   * Getter for navigation
   */
  get permissions$(): Observable<Permission> {
    return this._permissions.asObservable();
  }

  set updatPermissions$(next: Permission) {
    this._permissions.next(next);
  }

  loadLocalStorage(): Observable<Boolean> {
    this._permissions.next(JSON.parse(localStorage.getItem("permissions")));
    return of(true);
  }

  hasPermission(url: string): Boolean {
    const permissons = JSON.parse(localStorage.getItem("permissions"));
    return Boolean(permissons[url]);
  }

  hasPermissonAccion(url: string, accion: string): Boolean {
    const permissons = this._permissions.getValue();

    if (!permissons[url]) return false;

    return permissons[url][accion];
  }
}
