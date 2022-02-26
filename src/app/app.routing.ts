import { Route } from "@angular/router";
import { InitialDataResolver } from "./app.resolvers";
import { AuthGuard } from "./core/auth/guards/auth.guard";
import { NoAuthGuard } from "./core/auth/guards/noAuth.guard";
import { MenuPermissionGuard } from "./core/permission/guards/menu-permission.guard";
import { LayoutComponent } from "./layout/layout.component";
import { MsalGuard } from "@azure/msal-angular";

export const commonRoutes = [
  { path: "", pathMatch: "full", redirectTo: "admin/informes/list" },
  {
    path: "signed-in-redirect",
    pathMatch: "full",
    redirectTo: "admin/informes/list",
  },
  {
    path: "",
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: "empty",
    },
    children: [
      {
        path: "sign-in",
        loadChildren: () =>
          import("app/modules/auth/sign-in/sign-in.module").then(
            (m) => m.AuthSignInModule
          ),
      },
    ],
  },

  // Auth routes for authenticated users
  {
    path: "",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: "empty",
    },
    children: [
      {
        path: "sign-out",
        loadChildren: () =>
          import("app/modules/auth/sign-out/sign-out.module").then(
            (m) => m.AuthSignOutModule
          ),
      },
    ],
  },
];

export const dcpRoutes: Route[] = [
  ...commonRoutes,
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      layout: "enterprise",
    },
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: "admin",
        loadChildren: (): any =>
          import("app/projects/dcp/kmmp.module").then((m) => m.KmmpModule),
        canActivate: [MsalGuard],
      },

      // 404 & Catch all
      {
        path: "pagina-no-encontrada",
        pathMatch: "full",
        loadChildren: () =>
          import("app/modules/error/error-404/error-404.module").then(
            (m) => m.Error404Module
          ),
      },

      {
        path: "redirecting",
        pathMatch: "full",
        //redirectTo: "admin/informes/list",

        loadChildren: () =>
          import("app/modules/auth/redirecting/redirecting.module").then(
            (m) => m.AuthRedircetingnModule
          ),
      },
      { path: "**", redirectTo: "pagina-no-encontrada" },
    ],
  },
];

export const kmmpRoutes: Route[] = [
  ...commonRoutes,
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      layout: "enterprise",
    },
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: "admin",
        loadChildren: (): any =>
          import("app/projects/dcp/kmmp.module").then((m) => m.KmmpModule),
      },
      // 404 & Catch all
      {
        path: "pagina-no-encontrada",
        pathMatch: "full",
        loadChildren: () =>
          import("app/modules/error/error-404/error-404.module").then(
            (m) => m.Error404Module
          ),
      },
      { path: "**", redirectTo: "pagina-no-encontrada" },
    ],
  },
];

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [];
