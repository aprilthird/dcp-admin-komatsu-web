import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "app/shared/shared.module";
import { MaestrosRoutingModule } from "./maestros-routing.module";

//COMPONENTS

import { ClientesComponent } from "./clientes/clientes.component";
import { MaestrosComponent } from "./maestros.component";

//PIPES
import { TextFilterPipe } from "../../../shared/pipes/text-filter.pipe";
//FUSE MODULES
import { FuseNavigationModule } from "@fuse/components/navigation";

//MATERIAL MODULES
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
import { FuseConfirmationModule } from "@fuse/services/confirmation";
import { FuseAlertModule } from "@fuse/components/alert";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { DialogAddClientComponent } from "./clientes/dialog-add-client/dialog-add-client.component";
import { EquiposComponent } from "./equipos/equipos.component";
import { DialogAddEquiposComponent } from "./equipos/dialog-add-equipos/dialog-add-equipos.component";
import { BahiasComponent } from "./bahias/bahias.component";
import { DialogAddBahiasComponent } from "./bahias/dialog-add-bahias/dialog-add-bahias.component";
import { ModelosComponent } from "./modelos/modelos.component";
import { DialogAddModelosComponent } from "./modelos/dialog-add-modelos/dialog-add-modelos.component";
import { FlotasComponent } from "./flotas/flotas.component";
import { DialogAddFlotasComponent } from "./flotas/dialog-add-flotas/dialog-add-flotas.component";
import { ClaseActividadComponent } from "./clase-actividad/clase-actividad.component";
import { DialogAddClaseActividadComponent } from "./clase-actividad/dialog-add-clase-actividad/dialog-add-clase-actividad.component";
import { DialogAddTipoMtmtoComponent } from "./clase-actividad/dialog-add-tipo-mtmto/dialog-add-tipo-mtmto.component";
import { DispositivosComponent } from "./dispositivos/dispositivos.component";
import { DialogAddDispositivosComponent } from "./dispositivos/dialog-add-dispositivos/dialog-add-dispositivos.component";
import { DocumentosComponent } from "./documentos/documentos.component";
import { DialogAddDocumentosComponent } from "./documentos/dialog-add-documentos/dialog-add-documentos.component";
import { InnerHeaderComponent } from "./inner-header/inner-header.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TipoEquiposComponent } from "./tipo-equipos/tipo-equipos.component";
import { DialogAddTipoEquipoComponent } from "./tipo-equipos/dialog-add-tipo-equipo/dialog-add-tipo-equipo.component";

@NgModule({
  declarations: [
    MaestrosComponent,
    ClientesComponent,
    DialogAddClientComponent,
    EquiposComponent,
    DialogAddEquiposComponent,
    BahiasComponent,
    DialogAddBahiasComponent,
    ModelosComponent,
    DialogAddModelosComponent,
    FlotasComponent,
    DialogAddFlotasComponent,
    ClaseActividadComponent,
    DialogAddClaseActividadComponent,
    DialogAddTipoMtmtoComponent,
    DispositivosComponent,
    DialogAddDispositivosComponent,
    DocumentosComponent,
    DialogAddDocumentosComponent,
    InnerHeaderComponent,
    TipoEquiposComponent,
    DialogAddTipoEquipoComponent,
  ],
  imports: [
    CommonModule,
    MaestrosRoutingModule,
    FuseNavigationModule,
    MatExpansionModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSortModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSelectModule,
    FuseConfirmationModule,
    FuseAlertModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class MaestrosModule {}
