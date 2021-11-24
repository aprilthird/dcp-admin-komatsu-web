import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuPermissionGuard } from "app/core/permission/guards/menu-permission.guard";
import { BahiasComponent } from "./bahias/bahias.component";
import { ClaseActividadComponent } from "./clase-actividad/clase-actividad.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { DispositivosComponent } from "./dispositivos/dispositivos.component";
import { DocumentosComponent } from "./documentos/documentos.component";
import { EquiposComponent } from "./equipos/equipos.component";
import { FlotasComponent } from "./flotas/flotas.component";
import { MaestrosComponent } from "./maestros.component";
import { ModelosComponent } from "./modelos/modelos.component";
import { TipoEquiposComponent } from "./tipo-equipos/tipo-equipos.component";

const routes: Routes = [
  {
    path: "",
    component: MaestrosComponent,
    children: [
      {
        path: "clientes",
        component: ClientesComponent,
        //canActivate: [MenuPermissionGuard],
      },

      {
        path: "equipos",
        component: EquiposComponent,
        //canActivate: [MenuPermissionGuard],
      },

      {
        path: "bahias",
        component: BahiasComponent,
        //canActivate: [MenuPermissionGuard],
      },
      {
        path: "modelos",
        component: ModelosComponent,
        //canActivate: [MenuPermissionGuard],
      },
      {
        path: "flotas",
        component: FlotasComponent,
        //canActivate: [MenuPermissionGuard],
      },

      {
        path: "clase_actividades",
        component: ClaseActividadComponent,
        //canActivate: [MenuPermissionGuard],
      },

      {
        path: "dispositivos",
        component: DispositivosComponent,
        //canActivate: [MenuPermissionGuard],
      },

      {
        path: "tipo_equipos",
        component: TipoEquiposComponent,
        //canActivate: [MenuPermissionGuard],
      },

      {
        path: "agregar_documentos",
        component: DocumentosComponent,
        //canActivate: [MenuPermissionGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestrosRoutingModule {}
