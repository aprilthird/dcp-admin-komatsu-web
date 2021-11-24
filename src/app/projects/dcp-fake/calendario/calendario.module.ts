import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { NoLaboralesComponent } from './no-laborales/no-laborales.component';
import { ContablesComponent } from './contables/contables.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    NoLaboralesComponent,
    ContablesComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    FullCalendarModule,
    CalendarioRoutingModule
  ]
})
export class CalendarioModule { }
