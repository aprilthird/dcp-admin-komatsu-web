import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuPermissionGuard } from "app/core/permission/guards/menu-permission.guard";
import { AjustesComponent } from "./ajustes.component";
import { CrearUsuarioComponent } from "./crear-usuario/crear-usuario.component";
import { CrearUsuarioResolver } from "./crear-usuario/crear-usuario.resolver";
import { UsuariosComponent } from "./usuarios/usuarios.component";

const routes: Routes = [
  {
    path: "/admin/ajustes/usuarios",
    component: CrearUsuarioComponent,
    data: {
      rutaPermisson: "/admin/ajustes/usuarios",
    },
    canActivate: [MenuPermissionGuard],
    resolve: {
      initialData: CrearUsuarioResolver,
    },
  },

  {
    path: "usuarios/crear",
    component: CrearUsuarioComponent,
    data: {
      rutaPermisson: "/admin/ajustes/usuarios",
    },
    canActivate: [MenuPermissionGuard],
    resolve: {
      initialData: CrearUsuarioResolver,
    },
  },

  {
    path: "usuarios/editar/:id",
    component: CrearUsuarioComponent,
    data: {
      rutaPermisson: "/admin/ajustes/usuarios",
    },
    canActivate: [MenuPermissionGuard],
    resolve: {
      initialData: CrearUsuarioResolver,
    },
  },
  {
    path: "",
    component: AjustesComponent,
    children: [
      {
        path: "usuarios",
        component: UsuariosComponent,
        canActivate: [MenuPermissionGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjustesRoutingModule {}
