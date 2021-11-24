import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPermissionGuard } from 'app/core/permission/guards/menu-permission.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DcpComponent } from './dcp.component';

const routes: Routes = [
  {
  path: '',
  component: DcpComponent,
  children: [
    {
      path: 'seguridad',
      loadChildren: () => import('./seguridad/seguridad.module').then(m => m.SeguridadModule)
    },
    {
      path: 'calendario',
      loadChildren: () => import('./calendario/calendario.module').then(m => m.CalendarioModule)
    },
    {
      path: 'formatos',
      loadChildren: () => import('./formatos/formatos.module').then(m => m.FormatosModule)
    },
    {
      path: 'dispositivos',
      loadChildren: () => import('./dispositivos/dispositivos.module').then(m => m.DispositivosModule)
    },
    {
      path: '',
      component: DashboardComponent,
      canActivate: [MenuPermissionGuard]
    }
    // { 
    //   path: 'formulario',
    //   component: FormularioComponent,
    //   data: {
    //     rutaPermisson: 'rtPerfiles' 
    //   },
    //   canActivate: [MenuPermissionGuard],
    //   children: [
    //     {
    //       path: ':id',
    //       component: GruposComponent
    //     }
    //   ]
    // },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DcpRoutingModule { }
