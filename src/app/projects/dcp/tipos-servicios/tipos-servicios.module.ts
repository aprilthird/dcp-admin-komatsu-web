import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "app/shared/shared.module";
import { TiposServiciosRoutingModule } from "./tipos-servicios-routing.module";

//COMPONENTS
import { TiposServiciosComponent } from "./tipos-servicios.component";

//MATERIAL
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from "@angular/material/datepicker";

//FUSE
import { FuseConfirmationModule } from "@fuse/services/confirmation";
import { FuseAlertModule } from "@fuse/components/alert";
import { DialogAddTipoServicioComponent } from "./dialog-add-tipo-servicio/dialog-add-tipo-servicio.component";

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";

@NgModule({
  declarations: [TiposServiciosComponent, DialogAddTipoServicioComponent],
  imports: [
    CommonModule,
    TiposServiciosRoutingModule,
    MatExpansionModule,
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    FuseConfirmationModule,
    FuseAlertModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,

    SharedModule,
  ],
})
export class TiposServiciosModule {}
