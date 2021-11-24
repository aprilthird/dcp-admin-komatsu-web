import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { KmmpRoutingModule } from "./kmmp-routing.module";
import { HomeComponent } from "./home/home.component";
import { KmmpComponent } from "./kmmp.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FuseNavigationModule } from "@fuse/components/navigation";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSortModule } from "@angular/material/sort";
import { FiltersComponent } from "./dashboard/filters/filters.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { StatusFlotaComponent } from "./dashboard/charts/status-flota/status-flota.component";
import { SummaryCardsComponent } from "./dashboard/summary-cards/summary-cards.component";
import { StatusFlotaSingleComponent } from "./dashboard/charts/status-flota-single/status-flota-single.component";
//FUSE
import { FuseDateRangeModule } from "@fuse/components/date-range";
import { NoExecuteActivitiesComponent } from "./dashboard/charts/no-execute-activities/no-execute-activities.component";
import { NoExecuteActivitiesSingleComponent } from "./dashboard/charts/no-execute-activities-single/no-execute-activities-single.component";
import { DeleyedCodeComponent } from "./dashboard/charts/deleyed-code/deleyed-code.component";
import { AdhesionComponent } from "./dashboard/charts/adhesion/adhesion.component";

//DEV-EXTREME
//import { DxChartModule } from "devextreme-angular";

@NgModule({
  declarations: [
    HomeComponent,
    KmmpComponent,
    DashboardComponent,
    FiltersComponent,
    StatusFlotaComponent,
    SummaryCardsComponent,
    StatusFlotaSingleComponent,
    NoExecuteActivitiesComponent,
    NoExecuteActivitiesSingleComponent,
    DeleyedCodeComponent,
    AdhesionComponent,
  ],
  imports: [
    CommonModule,
    KmmpRoutingModule,
    MatSidenavModule,
    FuseNavigationModule,
    NgApexchartsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,
    MatSidenavModule,
    FuseNavigationModule,
    NgApexchartsModule,
    MatFormFieldModule,
    MatSelectModule,
    FuseDateRangeModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    //DxChartModule,
  ],
})
export class KmmpModule {}
