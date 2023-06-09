import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AjustesRoutingModule } from "./ajustes-routing.module";
import { AjustesComponent } from "./ajustes.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSortModule } from "@angular/material/sort";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FuseNavigationModule } from "@fuse/components/navigation";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTreeModule } from "@angular/material/tree";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FuseAlertModule } from "@fuse/components/alert";
import { FuseConfirmationModule } from "@fuse/services/confirmation";
import { MatListModule } from "@angular/material/list";
import { SharedModule } from "app/shared/shared.module";
import { CrearUsuarioComponent } from "./crear-usuario/crear-usuario.component";
import { PerfilesComponent } from './perfiles/perfiles.component';

@NgModule({
  declarations: [AjustesComponent, UsuariosComponent, CrearUsuarioComponent, PerfilesComponent],
  imports: [
    CommonModule,
    AjustesRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,
    MatSidenavModule,
    FuseNavigationModule,
    MatExpansionModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatCheckboxModule,
    FuseAlertModule,
    FuseConfirmationModule,
    MatListModule,
    SharedModule,
  ],
})
export class AjustesModule {}
