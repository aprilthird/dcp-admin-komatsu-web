import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { FuseNavigationItem } from "@fuse/components/navigation";
import { FuseMediaWatcherService } from "@fuse/services/media-watcher";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.scss"],
})
export class FormularioComponent implements OnInit {
  @ViewChild("matDrawer", { static: true }) matDrawer: MatDrawer;
  drawerMode: "side" | "over";
  drawerOpened: boolean;
  menuData: FuseNavigationItem[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService
  ) {

    this.menuData = [
      {
        id: "other-components.common",
        title: "Formulario: FM01",
        subtitle: "Secciones",
        type: "group",
        children: [
          {
            id: "other-components.common.overview",
            title: "Datos personales",
            type: "basic",
            link: "/dashboard/formulario/10",
          },
          {
            id: "other-components.common.overview",
            title: "Estudios",
            type: "basic",
            link: "/dashboard/formulario/11",
          },
          {
            id: "other-components.common.overview",
            title: "Familiares",
            type: "basic",
            link: "/dashboard/formulario/12",
          },
        ],
      },
    ];
  }

  ngOnInit(): void {
     // Subscribe to media query change
     this._fuseMediaWatcherService.onMediaChange$
     .pipe(takeUntil(this._unsubscribeAll))
     .subscribe(({matchingAliases}) => {

         // Set the drawerMode and drawerOpened
         if ( matchingAliases.includes('md') )
         {
             this.drawerMode = 'side';
             this.drawerOpened = true;
         }
         else
         {
             this.drawerMode = 'over';
             this.drawerOpened = false;
         }

         // Mark for check
         this._changeDetectorRef.markForCheck();
     });
  }
}
