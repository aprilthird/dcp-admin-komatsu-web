import { Route } from "@angular/router";
import { RedirectingComponent } from "./redirecting.component";

export const authRedirectingRoutes: Route[] = [
  {
    path: "",
    component: RedirectingComponent,
  },
];
