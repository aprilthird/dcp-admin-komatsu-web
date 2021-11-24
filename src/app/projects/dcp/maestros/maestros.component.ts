import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { FuseNavigationItem } from "@fuse/components/navigation";
import { PermissionService } from "app/core/permission/permission.service";

@Component({
  selector: "app-maestros",
  templateUrl: "./maestros.component.html",
  styleUrls: ["./maestros.component.scss"],
})
export class MaestrosComponent implements OnInit {
  @ViewChild("matDrawer", { static: true }) matDrawer: MatDrawer;
  drawerMode: "side" | "over";
  drawerOpened: boolean;
  menuData: FuseNavigationItem[];

  constructor(private _permissonServices: PermissionService) {
    this.menuData = [
      {
        id: "maestros",
        title: "Tipo de Maestro",
        type: "group",
        children: [],
      },
    ];

    this.menuData[0].children.push({
      id: "maestros.clientes",
      title: "Clientes",
      type: "basic",
      link: "/admin/maestros/clientes",
    });

    this.menuData[0].children.push({
      id: "maestros.equipos",
      title: "Equipos",
      type: "basic",
      link: "/admin/maestros/equipos",
    });

    this.menuData[0].children.push({
      id: "maestros.equipos",
      title: "Tipo de Equipos",
      type: "basic",
      link: "/admin/maestros/tipo_equipos",
    });

    this.menuData[0].children.push({
      id: "maestros.bahias",
      title: "Bahias",
      type: "basic",
      link: "/admin/maestros/bahias",
    });

    this.menuData[0].children.push({
      id: "maestros.modelos",
      title: "Modelos",
      type: "basic",
      link: "/admin/maestros/modelos",
    });

    this.menuData[0].children.push({
      id: "maestros.flotas",
      title: "Flotas",
      type: "basic",
      link: "/admin/maestros/flotas",
    });

    this.menuData[0].children.push({
      id: "maestros.clase_actividad",
      title: "Clase de actividad",
      type: "basic",
      link: "/admin/maestros/clase_actividades",
    });

    this.menuData[0].children.push({
      id: "maestros.dispositivos",
      title: "Dispositivos",
      type: "basic",
      link: "/admin/maestros/dispositivos",
    });

    this.menuData[0].children.push({
      id: "maestros.agregar_documentos",
      title: "Agregar documentos",
      type: "basic",
      link: "/admin/maestros/agregar_documentos",
    });
  }

  ngOnInit(): void {
    this.drawerMode = "side";
    this.drawerOpened = true;
  }
}
