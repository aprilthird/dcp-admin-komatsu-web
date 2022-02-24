import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";

//COMPONENTS
import { CommonModule } from "@angular/common";
import { ActividadesComponent } from "./actividades.component";
import { FilterComponent } from "./filter/filter.component";
import { ActividadesRoutingModule } from "./actividades-routing.mudule";
import { ListComponent } from "./list/list.component";
import { ActaConformidadComponent } from "./acta-conformidad/acta-conformidad.component";

//MATERIAL

import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatRippleModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";

//fuse
import { FuseAlertModule } from "@fuse/components/alert";

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";

import { FilterDialogComponent } from "./filter/filter-dialog/filter-dialog.component";

import { FuseConfirmationModule } from "@fuse/services/confirmation";
import { ReportFilterDialogComponent } from "./filter/report-filter-dialog/report-filter-dialog.component";

@NgModule({
  declarations: [
    ActividadesComponent,
    FilterComponent,
    ListComponent,
    FilterDialogComponent,
    ActaConformidadComponent,
    ReportFilterDialogComponent,
  ],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    SharedModule,
    MatIconModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatInputModule,
    MatPaginatorModule,
    MatTooltipModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    FuseConfirmationModule,
    NgxMatTimepickerModule,
    FuseAlertModule,
  ],
})
export class ActividadesModule {}
