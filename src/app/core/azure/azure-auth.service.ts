import { Injectable } from "@angular/core";
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { InteractionStatus } from "@azure/msal-browser";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AzureAuthService {
  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  logOut() {
    this.authService.logout();
  }

  logIn() {
    const isIE =
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      window.navigator.userAgent.indexOf("Trident/") > -1;

    if (!isIE) {
      this.msalBroadcastService.inProgress$
        .pipe(
          filter(
            (status: InteractionStatus) => status === InteractionStatus.None
          )
        )
        .subscribe(() => {
          this.authService.loginRedirect();
        });
    } else {
      this.msalBroadcastService.inProgress$
        .pipe(
          filter(
            (status: InteractionStatus) => status === InteractionStatus.None
          )
        )
        .subscribe(() => {
          this.authService.loginRedirect();
        });
    }
  }
}
