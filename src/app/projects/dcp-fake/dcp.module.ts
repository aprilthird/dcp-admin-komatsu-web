import { NgModule } from '@angular/core';

import { DcpRoutingModule } from './dcp-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { DcpComponent } from './dcp.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormularioComponent } from './formulario/formulario.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { GruposComponent } from './formulario/grupos/grupos.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    DcpComponent,
    FormularioComponent,
    GruposComponent,
    DashboardComponent,
  ],
  imports: [
    DcpRoutingModule,
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
    NgApexchartsModule,
    SharedModule
  ]
})
export class DcpModule { }
