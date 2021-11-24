import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { SharedModule } from 'app/shared/shared.module';

import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import {MatListModule} from '@angular/material/list';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertModule } from '@fuse/components/alert';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogAddPerfilComponent } from './components/dialog-add-perfil/dialog-add-perfil.component';
import { DialogDeletePerfilComponent } from './components/dialog-delete-perfil/dialog-delete-perfil.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    CrearUsuarioComponent,
    PerfilesComponent,
    CrearPerfilComponent,
    DialogAddPerfilComponent,
    DialogDeletePerfilComponent,
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
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
  ]
})
export class SeguridadModule { }
