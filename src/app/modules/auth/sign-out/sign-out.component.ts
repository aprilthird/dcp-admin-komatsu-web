import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subject, timer } from "rxjs";
import { filter, finalize, takeUntil, takeWhile, tap } from "rxjs/operators";
import { AuthService } from "app/core/auth/auth.service";
import { environment } from "environments/environment";
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
} from "@azure/msal-angular";
import { AzureAuthService } from "app/core/azure/azure-auth.service";
import { EventMessage, InteractionStatus } from "@azure/msal-browser";

@Component({
  selector: "auth-sign-out",
  templateUrl: "./sign-out.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class AuthSignOutComponent implements OnInit, OnDestroy {
  environment = environment;
  countdown: number = 5;
  countdownMapping: any = {
    "=1": "# segundo",
    other: "# segundos",
  };
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private msalBroadcastService: MsalBroadcastService,
    private _azureService: AzureAuthService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // this._azureService.logIn();
    // this.msalBroadcastService.msalSubject$
    //   .pipe(
    //     filter((msg: EventMessage) => msg.eventType === "msal:loginSuccess")
    //   )
    //   .subscribe((result: EventMessage) => {
    //     console.log("result ", result);
    //   });

    // this.msalBroadcastService.inProgress$
    //   .pipe(
    //     filter((status: InteractionStatus) => status === InteractionStatus.None)
    //   )
    //   .subscribe(() => {
    //     //this.setLoginDisplay();
    //   });

    // if (this.msalGuardConfig.authRequest) {
    //   //this._azureService.logIn();
    // }

    // Sign out
    this._authService.signOut();

    // Redirect after the countdown
    timer(1000, 1000)
      .pipe(
        finalize(() => {
          this._router.navigateByUrl("/sign-in");
        }),
        takeWhile(() => this.countdown > 0),
        takeUntil(this._unsubscribeAll),
        tap(() => this.countdown--)
      )
      .subscribe();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
