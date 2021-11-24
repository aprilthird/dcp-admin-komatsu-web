import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuPermissionGuard } from "app/core/permission/guards/menu-permission.guard";
import { CrearPerfilComponent } from "./crear-perfil/crear-perfil.component";
import { CrearPerfilResolver } from "./crear-perfil/create-perfil.resolver";
import { CrearUsuarioComponent } from "./crear-usuario/crear-usuario.component";
import { CrearUsuarioResolver } from "./crear-usuario/crear-usuario.resolver";
import { PerfilesComponent } from "./perfiles/perfiles.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

const routes: Routes = [
  {
    path: "usuarios",
    component: UsuariosComponent,
    canActivate: [MenuPermissionGuard],
  },
  {
    path: "usuarios/crear",
    component: CrearUsuarioComponent,
    data: {
      rutaPermisson: "/admin/seguridad/usuarios",
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
      rutaPermisson: "/admin/seguridad/usuarios",
    },
    resolve: {
      initialData: CrearUsuarioResolver,
    },
  },
  {
    path: "perfiles",
    component: PerfilesComponent,
    data: {
      rutaPermisson: "/admin/seguridad/perfiles",
    },
  },
  {
    path: "perfiles/editar/:id",
    component: CrearPerfilComponent,
    data: {
      rutaPermisson: "/admin/seguridad/perfiles",
    },
    resolve: {
      initialData: CrearPerfilResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule {}
