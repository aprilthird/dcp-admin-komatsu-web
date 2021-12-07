import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuPermissionGuard } from "app/core/permission/guards/menu-permission.guard";
import { KmmpComponent } from "./kmmp.component";

const routes: Routes = [
  {
    path: "",
    component: KmmpComponent,
    children: [
      {
        path: "ajustes",
        loadChildren: () =>
          import("./ajustes/ajustes.module").then((m) => m.AjustesModule),
      },
      {
        path: "formatos",
        loadChildren: () =>
          import("./formatos/formatos.module").then((m) => m.FormatosModule),
      },
      {
        path: "informes",
        loadChildren: () =>
          import("./actividades/actividades.module").then(
            (m) => m.ActividadesModule
          ),
      },
      {
        path: "tipos_servicios",
        loadChildren: () =>
          import("./tipos-servicios/tipos-servicios.module").then(
            (m) => m.TiposServiciosModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KmmpRoutingModule {}
