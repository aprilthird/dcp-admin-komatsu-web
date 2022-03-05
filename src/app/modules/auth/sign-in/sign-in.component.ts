import { HttpErrorResponse } from "@angular/common/http";
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalBroadcastService,
} from "@azure/msal-angular";
import { EventMessage, InteractionStatus } from "@azure/msal-browser";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertType } from "@fuse/components/alert";
import { AuthService } from "app/core/auth/auth.service";
import { AzureAuthService } from "app/core/azure/azure-auth.service";
import { NavigationService } from "app/core/navigation/navigation.service";
import { UiDialogsComponent } from "app/shared/ui/ui-dialogs/ui-dialogs.component";
import { environment } from "environments/environment";
import { filter } from "rxjs/operators";

@Component({
  selector: "auth-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
  // @ViewChild("signInNgForm") signInNgForm: NgForm;
  environment = environment;

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  signInForm: FormGroup;
  showAlert: boolean = false;
  loadingAzure: boolean;
  loading: boolean;

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _navigationService: NavigationService,
    private _azureService: AzureAuthService,
    private msalBroadcastService: MsalBroadcastService,
    private _matDialog: MatDialog //@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === "msal:loginSuccess")
      )
      .subscribe((result: EventMessage) => {});

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        //this.setLoginDisplay();
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */

  async signIn() {
    await this.redirecting();
  }

  redirecting(): Promise<any> {
    return new Promise(() => {
      this.loading = false;
      const redirectURL = "/redirecting";
      setTimeout(() => {
        this._router.navigateByUrl(redirectURL);
      });
    });
  }
}
