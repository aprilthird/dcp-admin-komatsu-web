import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
} from "@azure/msal-angular";
import { EventMessage, InteractionStatus } from "@azure/msal-browser";
import { AzureAuthService } from "app/core/azure/azure-auth.service";
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

  constructor(
    private _router: Router,
    private msalBroadcastService: MsalBroadcastService,
    private _azureService: AzureAuthService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
  ) {}

  async ngOnInit() {
    if (
      localStorage.getItem("permissions") &&
      localStorage.getItem("permissions") !== null &&
      this.checkSessionAzure()
    ) {
      this._router.navigate(["signed-in-redirect"]);
    } else {
      this._azureService.logIn();
      this.msalBroadcastService.msalSubject$
        .pipe(
          filter((msg: EventMessage) => msg.eventType === "msal:loginSuccess")
        )
        .subscribe((result: EventMessage) => {
          console.log("msalSubject ", result);
          this._azureService.logIn();
        });
      this.msalBroadcastService.inProgress$
        .pipe(
          filter(
            (status: InteractionStatus) => status === InteractionStatus.None
          )
        )
        .subscribe((resp) => {
          console.log("inProgress$ ", resp);
        });
    }
  }

  private checkSessionAzure(): boolean {
    for (let i = 0; i < 15; i++) {
      const sessionKey = sessionStorage.key(i);
      if (sessionKey) {
        if (
          Object.keys(JSON.parse(sessionStorage.getItem(sessionKey))).find(
            (key) => key === "clientId"
          )
        ) {
          return true;
        }
      }
    }
  }
}
