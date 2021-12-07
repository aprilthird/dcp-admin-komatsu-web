import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormatosRoutingModule } from "./formatos-routing.module";
import { ListadoComponent } from "./listado/listado.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { EditarFormatoComponent } from "./editar-formato/editar-formato.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSortModule } from "@angular/material/sort";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { FuseNavigationModule } from "@fuse/components/navigation";
import { GruposComponent } from "./editar-formato/grupos/grupos.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogAddFormatoComponent } from "./components/dialog-add-formato/dialog-add-formato.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SharedModule } from "app/shared/shared.module";
import { DialogAddSeccionComponent } from "./components/dialog-add-seccion/dialog-add-seccion.component";
import { DialogAddGrupoComponent } from "./components/dialog-add-grupo/dialog-add-grupo.component";
import { DialogAddDatoComponent } from "./components/dialog-add-dato/dialog-add-dato.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { AsignarFormatoComponent } from "./asignar-formato/asignar-formato.component";
import { FuseConfirmationModule } from "@fuse/services/confirmation";
import { DialogAddAsignarComponent } from "./components/dialog-add-asignar/dialog-add-asignar.component";
import { FuseAlertModule } from "@fuse/components/alert";
import { DialogPrevisualizarComponent } from "./components/dialog-previsualizar/dialog-previsualizar.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { AsignacionesComponent } from "./asignaciones/asignaciones.component";
import { MatChipsModule } from "@angular/material/chips";
import { AperturaAsignacionComponent } from "./asignaciones/apertura-asignacion/apertura-asignacion.component";
import { ValidationFormatosComponent } from "./validation-formatos/validation-formatos.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { DialogValidateFormatComponent } from "./components/dialog-validate-format/dialog-validate-format.component";
import { DialogAddCommentComponent } from "./components/dialog-add-comment/dialog-add-comment.component";
import { MatMenuModule } from "@angular/material/menu";

//COMPONENTS
import { FotografiaComponent } from "./fotografia/fotografia.component";
import { ImagePreviewComponent } from "./fotografia/image-preview/image-preview.component";

//CROPER
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  declarations: [
    ListadoComponent,
    EditarFormatoComponent,
    GruposComponent,
    DialogAddFormatoComponent,
    DialogAddSeccionComponent,
    DialogAddGrupoComponent,
    DialogAddDatoComponent,
    AsignarFormatoComponent,
    DialogAddAsignarComponent,
    DialogPrevisualizarComponent,
    AsignacionesComponent,
    AperturaAsignacionComponent,
    ValidationFormatosComponent,
    DialogValidateFormatComponent,
    DialogAddCommentComponent,
    FotografiaComponent,
    ImagePreviewComponent,
  ],
  imports: [
    CommonModule,
    FormatosRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSortModule,
    MatSidenavModule,
    MatDividerModule,
    MatExpansionModule,
    DragDropModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    FuseNavigationModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FuseConfirmationModule,
    FuseAlertModule,
    MatDatepickerModule,
    MatChipsModule,
    MatCheckboxModule,
    MatMenuModule,
    ImageCropperModule,

    SharedModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "es-ES" }],
})
export class FormatosModule {}
