import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuPermissionGuard } from "app/core/permission/guards/menu-permission.guard";
import { FotografiaComponent } from "../formatos/fotografia/fotografia.component";
import { ValidationFormatosComponent } from "../formatos/validation-formatos/validation-formatos.component";
import { ActividadesComponent } from "./actividades.component";
import { MassiveUploadComponent } from "./dialogs/massive-upload/massive-upload.component";
import { ActivityAddEditComponent } from "./list/activity-add-edit/activity-add-edit.component";
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
        path: "add",
        component: ActivityAddEditComponent,
      },

      {
        path: "edit/:id",
        component: ActivityAddEditComponent,
      },

      {
        path: "validation",
        component: ValidationFormatosComponent,
      },
      {
        path: "validation/fotografias",
        component: FotografiaComponent,
      },
      {
        path: "validation/:idActivity",
        component: ValidationFormatosComponent,
      },
      {
        path: "validation/:idActivity/:idFormat/:idSection",
        component: ValidationFormatosComponent,
      },

      {
        path: "upload",
        component: MassiveUploadComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesRoutingModule {}
