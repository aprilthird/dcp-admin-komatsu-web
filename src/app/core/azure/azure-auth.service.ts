import { A } from "@angular/cdk/keycodes";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { EventMessage, InteractionStatus } from "@azure/msal-browser";
import { forkJoin, Observable, of, pipe, Subject, timer } from "rxjs";
import { filter } from "rxjs/operators";
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
      //setTimeout(async () => {
      await this.redirecting()
        .then(async (res: any) => {
          console.log(res.account.username);
          await this._authService
            .signInAD(res.account.username)
            .toPromise()
            .then(() => this._navigationService.get().toPromise());
        })
        .catch((err) => {
          if (err === "User is already logged in.") {
            setTimeout(() => {
              this._router.navigate(["admin/informes/list"]);
            }, 250);
          } else {
            this._router.navigate(["sign-in"]);
          }
        });
      //});

      this.msalBroadcastService.inProgress$
        .pipe(
          filter(
            (status: InteractionStatus) => status === InteractionStatus.None
          )
        )
        .subscribe((resp) => {
          this._router.navigate(["admin/informes/list"]);
          //this.authService.loginPopup();
        });
    } else {
      this.authService.loginPopup;
    }
  }

  private redirecting() {
    return new Promise<void>(async (res) => {
      const login = await this.loginPopUp();
      res(login);
    });
  }

  private loginPopUp() {
    return new Promise<any>((res) => {
      this.authService.loginPopup().subscribe(
        async (resp) => res(resp),
        (err) => {
          this._router.navigate(["sign-out"]);
        }
      );
    });
  }

  // private first(emailAD: string) {
  //   this._authService
  //     .signInAD(emailAD)
  //     .pipe(take(1))
  //     .toPromise()
  //     .then(() => this.second())
  //     .finally(() => alert("start"));
  // }

  // private second() {
  //   this._navigationService
  //     .get()
  //     .pipe(take(1))
  //     .toPromise()
  //     .then(() => alert("end"));
  // }
}
