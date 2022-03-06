import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
} from "@azure/msal-angular";
import { EventMessage, InteractionStatus } from "@azure/msal-browser";
import { AuthService } from "app/core/auth/auth.service";
import { AuthUtils } from "app/core/auth/auth.utils";
import { AzureAuthService } from "app/core/azure/azure-auth.service";
import { UiDialogsComponent } from "app/shared/ui/ui-dialogs/ui-dialogs.component";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-redirecting",
  templateUrl: "./redirecting.component.html",
  styleUrls: ["./redirecting.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RedirectingComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  userDoesNot: string;

  constructor(
    private _router: Router,
    private msalBroadcastService: MsalBroadcastService,
    private _azureService: AzureAuthService,
    private _authService: AuthService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private _matDialog: MatDialog
  ) {
    this.userDoesNot = localStorage.getItem("userDoesNotExist");
  }

  async ngOnInit() {
    if (
      localStorage.getItem("permissions") &&
      localStorage.getItem("accessToken") &&
      localStorage.getItem("permissions") !== null &&
      this.checkSessionAzure
    ) {
      if (AuthUtils.isTokenExpired(this._authService.accessToken)) {
        localStorage.clear();
        this._azureService.logIn();
      } else {
        this._router.navigate(["signed-in-redirect"]);
      }
    } else {
      if (this.userDoesNot) {
        localStorage.removeItem("userDoesNotExist");
        const dialog = this._matDialog.open(UiDialogsComponent, {
          width: "600px",
          data: {
            title: "Error",
            message: `Usuario ${this.userDoesNot} no existe en el sistema, al cerrar éste mensaje, favor cierre sesión de éste ususrio en la siguiente ventana de Windows, e inicie sesión con un usuario existente, de lo contrario contacte al administrador del sistema`,
          },
        });

        await dialog
          .afterClosed()
          .toPromise()
          .then(() => this._azureService.logOut());
      } else {
        this._azureService.logIn();
      }

      this.msalBroadcastService.msalSubject$
        .pipe(
          filter((msg: EventMessage) => msg.eventType === "msal:loginSuccess")
        )
        .subscribe((result: EventMessage) => {
          //this._azureService.logIn();
        });
      this.msalBroadcastService.inProgress$
        .pipe(
          filter(
            (status: InteractionStatus) => status === InteractionStatus.None
          )
        )
        .subscribe((resp) => {});
    }
  }

  private checkSessionAzure(): boolean {
    for (let i = 0; i < 15; i++) {
      const sessionKey = sessionStorage.key(i);
      if (sessionKey) {
        try {
          if (
            Object.keys(JSON.parse(sessionStorage.getItem(sessionKey))).find(
              (key) => key === "clientId"
            )
          ) {
            return true;
          }
        } catch {
          return false;
        }
      }
    }
  }
}
