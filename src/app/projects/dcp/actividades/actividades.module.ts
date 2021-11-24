import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";

//COMPONENTS
import { CommonModule } from "@angular/common";
import { ActividadesComponent } from "./actividades.component";
import { FilterComponent } from "./filter/filter.component";
import { ActividadesRoutingModule } from "./actividades-routing.mudule";
import { ListComponent } from "./list/list.component";
import { UploadActivitiesComponent } from "./upload-activities/upload-activities.component";
import { ActivityComponent } from "./list/activity/activity.component";
import { ActivityAddEditComponent } from "./list/activity-add-edit/activity-add-edit.component";

//MATERIAL

import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { AssignBayComponent } from "./dialogs/assign-bay/assign-bay.component";
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

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";

//NGX INPUT SEARCH
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { FilterDialogComponent } from "./filter/filter-dialog/filter-dialog.component";
import { UploadActivityDialogComponent } from './dialogs/upload-activity-dialog/upload-activity-dialog.component';
import { MassiveUploadComponent } from './dialogs/massive-upload/massive-upload.component';

@NgModule({
  declarations: [
    ActividadesComponent,
    FilterComponent,
    ListComponent,
    UploadActivitiesComponent,
    AssignBayComponent,
    FilterDialogComponent,
    ActivityComponent,
    ActivityAddEditComponent,
    UploadActivityDialogComponent,
    MassiveUploadComponent,
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
    NgxMatSelectSearchModule,
    MatDialogModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
  ],
})
export class ActividadesModule {}
