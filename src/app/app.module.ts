import { APP_INITIALIZER, InjectionToken, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ExtraOptions, PreloadAllModules, RouterModule } from "@angular/router";
import { MarkdownModule } from "ngx-markdown";
import { FuseModule } from "@fuse";
import { FuseConfigModule } from "@fuse/services/config";
import { CoreModule } from "app/core/core.module";
import { appConfigDCP, appConfigKMMP } from "app/core/config/app.config";
import { LayoutModule } from "app/layout/layout.module";
import { AppComponent } from "app/app.component";
import { appRoutes } from "app/app.routing";
import { environment } from "environments/environment";
import { MatNativeDateModule } from "@angular/material/core";

//Microsoft Azure Login
import {
  MsalModule,
  MSAL_INSTANCE,
  MsalService,
  MsalGuard,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptor,
  MsalBroadcastService,
} from "@azure/msal-angular";
import {
  MSALGuardConfigFactory,
  MSALInstanceFactory,
  MSALInterceptorConfigFactory,
} from "./core/azure/utils/MsalInstanceFactory";
import { InteractionType } from "@azure/msal-browser";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: "enabled",
  onSameUrlNavigation: "reload",
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),

    // //Fuse, FuseConfig & FuseMockAPI
    FuseModule,
    FuseConfigModule.forRoot(
      environment.project === "dcp" ? appConfigDCP : appConfigKMMP
    ),
    // FuseMockApiModule.forRoot(mockApiServices),

    // Core module of your application
    CoreModule,

    // // Layout module of your application
    LayoutModule,
    MatNativeDateModule,

    // // 3rd party modules that require global configuration via forRoot
    MarkdownModule.forRoot({}),
    MsalModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },

    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },

    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    //{ provide: APP_INITIALIZER, useFactory: initializerFactory, multi: true },
    MsalGuard,
    MsalService,
    MsalBroadcastService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
