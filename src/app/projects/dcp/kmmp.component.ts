import { Component, OnInit } from "@angular/core";
import {
  Router,
  Event as NavigationEvent,
  NavigationEnd,
} from "@angular/router";
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
