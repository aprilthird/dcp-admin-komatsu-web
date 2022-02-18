import { HttpErrorResponse } from "@angular/common/http";
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration } from "@azure/msal-angular";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertType } from "@fuse/components/alert";
import { AuthService } from "app/core/auth/auth.service";
import { AzureAuthService } from "app/core/azure/azure-auth.service";
import { NavigationService } from "app/core/navigation/navigation.service";
import { environment } from "environments/environment";

@Component({
  selector: "auth-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
  @ViewChild("signInNgForm") signInNgForm: NgForm;
  environment = environment;

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  signInForm: FormGroup;
  showAlert: boolean = false;
  loadingAzure: boolean;

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _navigationService: NavigationService,
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
    // Create the form
    this.signInForm = this._formBuilder.group({
      usr: ["", [Validators.required]],
      psw: ["", Validators.required],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */

  signIn(): void {
    if (this.msalGuardConfig.authRequest) {
      //this._azureService.logIn();
    }
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this._authService.signIn(this.signInForm.value).subscribe(
      () => {
        this._navigationService.get().subscribe((response: any) => {
          console.log("welcome");
          // Set the redirect url.
          // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
          // to the correct page after a successful sign in. This way, that url can be set via
          // routing file and we don't have to touch here.
          setTimeout(() => {
            const permissions = JSON.parse(localStorage.getItem("permissions"));
            const firstURL = Object.keys(permissions)[0];
            //const redirectURL = firstURL || "/signed-in-redirect";
            const redirectURL = "/admin/informes/list";
            // Navigate to the redirect url
            this._router.navigateByUrl(redirectURL);
          }, 100);
        });
      },
      (error: HttpErrorResponse) => {
        // Re-enable the form
        this.signInForm.enable();

        // Reset the form
        this.signInNgForm.resetForm();

        // Set the alert
        this.alert = {
          type: "error",
          message: error.error["message"]
            ? error.error["message"]
            : error.error["code"]
            ? error.error["code"]
            : "Por favor, revisa tu conexión a internet y vuelve a intentarlo",
        };

        // Show the alert
        this.showAlert = true;
      }
    );
  }
}
