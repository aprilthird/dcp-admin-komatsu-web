import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContablesComponent } from './contables/contables.component';
import { NoLaboralesComponent } from './no-laborales/no-laborales.component';

const routes: Routes = [
  {
    path: 'laboral',
    component: NoLaboralesComponent
  },
  {
    path: 'contable',
    component: ContablesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarioRoutingModule { }
