import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispositivosRoutingModule } from './dispositivos-routing.module';
import { ListadoComponent } from './listado/listado.component';


@NgModule({
  declarations: [
    ListadoComponent
  ],
  imports: [
    CommonModule,
    DispositivosRoutingModule
  ]
})
export class DispositivosModule { }
