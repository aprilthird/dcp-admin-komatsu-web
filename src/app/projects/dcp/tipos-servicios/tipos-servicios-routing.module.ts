import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TiposServiciosComponent } from "./tipos-servicios.component";

const routes: Routes = [
  {
    path: "",
    component: TiposServiciosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposServiciosRoutingModule {}
