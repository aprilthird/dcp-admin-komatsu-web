import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { RedirectingComponent } from "./redirecting.component";
import { authRedirectingRoutes } from "./redirecting.routing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [RedirectingComponent],
  imports: [
    RouterModule.forChild(authRedirectingRoutes),
    SharedModule,
    MatProgressSpinnerModule,
  ],
})
export class AuthRedircetingnModule {}
