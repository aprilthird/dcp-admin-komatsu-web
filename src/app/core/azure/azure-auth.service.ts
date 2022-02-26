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

    if (!isIE) {
      this.msalBroadcastService.msalSubject$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((resp) => console.log("subject ", resp));

      this.msalBroadcastService.inProgress$
        .pipe(
          filter(
            (status: InteractionStatus) => status === InteractionStatus.None
          )
        )
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(() => {
          setTimeout(() => {
            this.authService.loginRedirect();
          }, 5000);
        });
    } else {
      this.msalBroadcastService.inProgress$
        .pipe(
          filter(
            (status: InteractionStatus) => status === InteractionStatus.None
          )
        )
        .subscribe(() => {
          //this.authService.loginRedirect();
        });
    }
  }

  // private login(): void {
  //   this._authService.signIn({ usr: "solera", psw: "1234" }).subscribe(
  //     () => {
  //       this._navigationService.get().subscribe((response: any) => {
  //         // Set the redirect url.
  //         // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
  //         // to the correct page after a successful sign in. This way, that url can be set via
  //         // routing file and we don't have to touch here.
  //         setTimeout(() => {
  //           const permissions = JSON.parse(localStorage.getItem("permissions"));
  //           const firstURL = Object.keys(permissions)[0];
  //           //const redirectURL = firstURL || "/signed-in-redirect";
  //           //const redirectURL = "/admin/informes/list";
  //           const redirectURL = "/sign-out";
  //           // Navigate to the redirect url
  //           this._router.navigateByUrl(redirectURL);
  //         }, 100);
  //       });
  //     },
  //     (error: HttpErrorResponse) => {}
  //   );
  // }
}
