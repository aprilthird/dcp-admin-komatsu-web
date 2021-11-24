import { Title } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { dcpRoutes, kmmpRoutes } from "./app.routing";
import { NavigationService } from "./core/navigation/navigation.service";
import { PermissionService } from "./core/permission/permission.service";
import { DateAdapter } from "@angular/material/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent  implements OnInit {
  /**
   * Constructor
   */
  constructor(
    private router: Router,
    private _navigationService: NavigationService,
    private _permissonsService: PermissionService,
    private titleService:Title,
    private dateAdapter: DateAdapter<any>
  ) {
    if (environment.project === "dcp") {
      this.router.config = dcpRoutes;
      this.titleService.setTitle("DCP");

    } else {
      this.router.config = kmmpRoutes;
      this.titleService.setTitle("KMMP");

    }

    this._navigationService.loadLocalStorage();
    this._permissonsService.loadLocalStorage();
  }

  ngOnInit() {
    this.dateAdapter.setLocale('es');
  }
}
