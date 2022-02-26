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

  ngOnInit(): void {
    this._azureService.logIn();
    this.msalBroadcastService.msalSubject$
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter((msg: EventMessage) => msg.eventType === "msal:loginSuccess")
      )
      .subscribe((result: EventMessage) => {});
    this.msalBroadcastService.inProgress$
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {});
  }
}
