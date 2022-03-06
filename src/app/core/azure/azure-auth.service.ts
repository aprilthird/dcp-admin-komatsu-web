import { A } from "@angular/cdk/keycodes";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { EventMessage, InteractionStatus } from "@azure/msal-browser";
import { UiDialogsComponent } from "app/shared/ui/ui-dialogs/ui-dialogs.component";
import { initPathToRedirect } from "app/shared/utils/initPath";
import {
  BehaviorSubject,
  forkJoin,
  Observable,
  of,
  pipe,
  Subject,
  timer,
} from "rxjs";
import { filter } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { NavigationService } from "../navigation/navigation.service";

@Injectable({
  providedIn: "root",
})
export class AzureAuthService {
  msalSubject$: Observable<any>;
  userDoesExist: BehaviorSubject<string> = new BehaviorSubject(undefined);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  userDoesNot: string;
  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private _authService: AuthService,
    private _navigationService: NavigationService,
    private _router: Router,
    private _matDialog: MatDialog
  ) {
    this.userDoesNot = localStorage.getItem("userDoesNotExist");
  }

  logOut() {
    this.authService.logout();
  }

  async logIn() {
    const isIE =
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      window.navigator.userAgent.indexOf("Trident/") > -1;

    //if (!isIE) {
    console.log(this.userDoesNot);
    // if (this.userDoesNot) {
    //   await this.openDialog(this.userDoesNot, "err");
    // } else {
    await this.redirecting().then(async (res: any) => {
      console.log(res.account.username);
      await this._authService
        .signInAD(res.account.username)
        .toPromise()
        .then(async () => {
          await this._navigationService.get().toPromise();
          // .then(() => {
          //   this.successAzureConnection();
          // });
        })
        .catch(async (err) => {
          // localStorage.setItem("userDoesNotExist", res.account.username);
          // this.userDoesExist.next(res.account.username);
          //  await this.authService
          //    .logout()
          //    .toPromise()
          //    .then(() => this._router.navigate(["sign-out"]));
          //this._router.navigate(["sign-out"]);

          localStorage.setItem("userDoesNotExist", res.account.username);
          //await this.openDialog(res.account.username, err);

          // this.authService
          //   .logout()
          //   .toPromise()
          //   .then(() => this._router.navigate(["sign-out"]));
          //await this.openDialog(res.account.username, err);
        });
    });
    //}

    this.successAzureConnection();

    // this.msalBroadcastService.inProgress$
    //   .pipe(
    //     filter((status: InteractionStatus) => status === InteractionStatus.None)
    //   )
    //   .subscribe((resp) => {
    //     this._router.navigateByUrl(initPathToRedirect());

    //     //this._router.navigate(["admin/informes/list"]);
    //     //this.authService.loginPopup();
    //   });
    // //}
    // // else {
    // //   this.authService.loginPopup;
    // // }
  }

  successAzureConnection(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe((resp) => {
        setTimeout(() => {
          this._router.navigateByUrl(initPathToRedirect());
        }, 250);
      });
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

  async openDialog(usr: string, err?) {
    //localStorage.removeItem("userDoesNotExist");
    if (err === "User is already logged in.") {
      setTimeout(async () => {
        await this._router.navigateByUrl(initPathToRedirect());
      }, 250);
    } else {
      const dialog = this._matDialog.open(UiDialogsComponent, {
        width: "600px",
        data: {
          title: "Error",
          message: `Usuario ${usr} no existe en el sistema, al cerrar éste mensaje, favor cierre sesión de éste ususrio en la siguiente ventana de Windows, e inicie sesión con un usuario existente, de lo contrario contacte al administrador del sistema`,
        },
      });

      //this.authService.logout().toPromise();

      // await dialog
      //   .afterClosed()
      //   .toPromise()
      //   .then(async (e) => {
      //     this.authService.logout().toPromise();
      //     //this._router.navigate(["sign-in"]);
      //   });
    }
  }
}
