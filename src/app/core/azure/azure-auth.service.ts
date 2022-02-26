import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { EventMessage, InteractionStatus } from "@azure/msal-browser";
import { Observable, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { NavigationService } from "../navigation/navigation.service";

@Injectable({
  providedIn: "root",
})
export class AzureAuthService {
  msalSubject$: Observable<any>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private _authService: AuthService,
    private _navigationService: NavigationService,
    private _router: Router
  ) {}

  logOut() {
    this.authService.logout();
  }

  async logIn() {
    const isIE =
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      window.navigator.userAgent.indexOf("Trident/") > -1;
    const redirectURL = "/admin/informes/list";
    this._router.navigateByUrl(redirectURL);
    if (!isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup;
    }
  }
}
