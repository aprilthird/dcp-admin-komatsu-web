import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import moment from 'moment';
import { Observable } from 'rxjs';
import { PermissionService } from '../permission.service';

@Injectable({
  providedIn: 'root'
})
export class MenuPermissionGuard implements CanActivate {
  constructor(private _permissionService:PermissionService, private _router:Router) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._permissionService.hasPermission(route.data.rutaPermisson || state.url))
      return true;
    else {
      this._router.navigate(['**'])
    }
  }
  
}
