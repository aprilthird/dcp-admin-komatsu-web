import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { KmmpRoutingModule } from "./kmmp-routing.module";
import { HomeComponent } from "./home/home.component";
import { KmmpComponent } from "./kmmp.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FuseNavigationModule } from "@fuse/components/navigation";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
//FUSE
import { FuseDateRangeModule } from "@fuse/components/date-range";

@NgModule({
  declarations: [HomeComponent, KmmpComponent],
  imports: [
    CommonModule,
    KmmpRoutingModule,
    MatSidenavModule,
    FuseNavigationModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,
    MatSidenavModule,
    FuseNavigationModule,
    MatFormFieldModule,
    MatSelectModule,
    FuseDateRangeModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
  ],
})
export class KmmpModule {}
