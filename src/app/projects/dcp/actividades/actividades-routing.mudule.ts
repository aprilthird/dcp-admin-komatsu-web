import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuPermissionGuard } from "app/core/permission/guards/menu-permission.guard";
import { AttachDocumentsComponent } from "../formatos/attach-documents/attach-documents.component";
import { FotografiaComponent } from "../formatos/fotografia/fotografia.component";
import { ValidationFormatosComponent } from "../formatos/validation-formatos/validation-formatos.component";
import { ActaConformidadComponent } from "./acta-conformidad/acta-conformidad.component";
import { ActividadesComponent } from "./actividades.component";
import { ListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    component: ActividadesComponent,
    children: [
      {
        path: "list",
        component: ListComponent,
        //canActivate: [MenuPermissionGuard],
      },

      {
        path: "validation",
        component: ValidationFormatosComponent,
      },
      {
        path: "validation/fotografias/:idFormatoActividad",
        component: FotografiaComponent,
      },
      {
        path: "validation/documentos/:idFormatoActividad",
        component: AttachDocumentsComponent,
      },
      {
        path: "validation/:id",
        component: ValidationFormatosComponent,
      },
      {
        path: "validation/:id/:section",
        component: ValidationFormatosComponent,
      },
      {
        path: "acta_conformidad/:idActividad",
        component: ActaConformidadComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesRoutingModule {}
