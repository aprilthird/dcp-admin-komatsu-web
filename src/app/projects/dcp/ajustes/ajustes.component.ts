import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { FuseNavigationItem } from "@fuse/components/navigation";
import { FuseMediaWatcherService } from "@fuse/services/media-watcher";
import { PermissionService } from "app/core/permission/permission.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-ajustes",
  templateUrl: "./ajustes.component.html",
  styleUrls: ["./ajustes.component.scss"],
})
export class AjustesComponent implements OnInit {
  @ViewChild("matDrawer", { static: true }) matDrawer: MatDrawer;
  drawerMode: "side" | "over";
  drawerOpened: boolean;
  menuData: FuseNavigationItem[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _permissonServices: PermissionService,

    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService
  ) {
    this.menuData = [
      {
        id: "ajustes",
        title: "Ajustes",
        type: "group",
        children: []
      },
    ];

    if (this._permissonServices.hasPermission("/admin/ajustes/perfiles"))
      this.menuData[0].children.push({
        id: "ajustes.perfiles",
        title: "Perfiles",
        type: "basic",
        link: "/admin/ajustes/perfiles",
      });

    if (this._permissonServices.hasPermission("/admin/ajustes/usuarios"))
      this.menuData[0].children.push({
        id: "ajustes.usuarios",
        title: "Usuarios",
        type: "basic",
        link: "/admin/ajustes/usuarios",
      });

    if (this._permissonServices.hasPermission("/admin/ajustes/dispositivos"))
      this.menuData[0].children.push({
        id: "ajustes.usuarios",
        title: "Dispositivos",
        type: "basic",
        link: "/admin/ajustes/dispositivos",
      });
  }

  ngOnInit(): void {
    this.drawerMode = "side";
    this.drawerOpened = true;
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
