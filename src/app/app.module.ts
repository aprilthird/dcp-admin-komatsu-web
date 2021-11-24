import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { CoreModule } from 'app/core/core.module';
import { appConfigDCP, appConfigKMMP } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { environment } from 'environments/environment';
import { MatNativeDateModule } from '@angular/material/core';


const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // //Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(environment.project === 'dcp' ? appConfigDCP : appConfigKMMP),
        // FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // // Layout module of your application
        LayoutModule,
        MatNativeDateModule,

        // // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({})
    ],
    bootstrap   : [
        AppComponent
    ],
  
})
export class AppModule
{
}
