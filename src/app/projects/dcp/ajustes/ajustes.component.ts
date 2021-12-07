import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ajustes",
  templateUrl: "./ajustes.component.html",
  styleUrls: ["./ajustes.component.scss"],
})
export class AjustesComponent implements OnInit {
  drawerMode: "side" | "over";
  drawerOpened: boolean;

  constructor() {}

  ngOnInit(): void {}

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
  }
}
