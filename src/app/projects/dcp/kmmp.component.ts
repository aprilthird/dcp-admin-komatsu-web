import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import {
  NavigationStart,
  Router,
  Event as NavigationEvent,
  NavigationEnd,
} from "@angular/router";
import { FuseNavigationItem } from "@fuse/components/navigation";
import { FuseMediaWatcherService } from "@fuse/services/media-watcher";
import {
  validateRenderShrinkScreen,
  validateShrinkScreen,
} from "app/core/utils/screen-size.utils";
import { uiConfig } from "app/shared/ui/config";

@Component({
  selector: "app-kmmp",
  templateUrl: "./kmmp.component.html",
  styleUrls: ["./kmmp.component.scss"],
})
export class KmmpComponent implements OnInit {
  screenHeight = "auto";

  constructor(private router: Router) {}

  ngOnInit(): void {
    //this.screenSize.screenSize();
    this.screenSize();
  }

  screenSize(): void {
    if (validateRenderShrinkScreen(this.router.url)) {
      this.screenHeight = uiConfig.hightSize.long;
    }
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (validateShrinkScreen(val)) {
          this.screenHeight = "auto";
        } else {
          this.screenHeight = uiConfig.hightSize.long;
        }
      }
    });
  }
}
