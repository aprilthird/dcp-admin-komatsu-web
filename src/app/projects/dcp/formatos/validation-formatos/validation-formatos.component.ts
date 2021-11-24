import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { DialogAddCommentComponent } from "../components/dialog-add-comment/dialog-add-comment.component";
import { DialogValidateFormatComponent } from "../components/dialog-validate-format/dialog-validate-format.component";
import { ActivatedRoute } from "@angular/router";

//SERVICES
import { ActivitiesService } from "../../actividades/activities.service";

//FAKE CONFIG
import {
  ActivityFake,
  FormatosFake,
} from "../../fake-db/activities/activity-fake-db";

@Component({
  selector: "app-validation-formatos",
  templateUrl: "./validation-formatos.component.html",
  styleUrls: ["./validation-formatos.component.scss"],
})
export class ValidationFormatosComponent implements OnInit {
  currentSeccion: string;
  drawerMode: "side" | "over";
  drawerOpened: boolean;
  menuData: any[];
  commented: boolean;
  currentIdActivity: any;
  currentActivity: ActivityFake;
  sectionSelected: any;
  sectionId: any;
  formatoId: any;

  constructor(
    private matDialog: MatDialog,
    private activityServices: ActivitiesService,
    private routerActive: ActivatedRoute
  ) {
    this.getActivityId();
    this.getActivities();
    this.setCollapsableNav();
    this.setSectionData();
  }

  ngOnInit(): void {
    this.drawerMode = "side";
    this.drawerOpened = true;
  }

  private getActivityId(): void {
    this.routerActive.paramMap.subscribe((params: any) => {
      this.currentIdActivity = params.params["idActivity"];
      this.sectionId = params.params["idSection"];
      this.formatoId = params.params["idFormat"];
    });
  }

  private getActivities(): void {
    this.activityServices.activities$.subscribe(
      (activities: ActivityFake[]) => {
        this.currentActivity = activities.find(
          (activity) => activity.id === Number(this.currentIdActivity)
        );

        console.log("this.currentActivity ", this.currentActivity);
      }
    );
  }

  setSectionData(id?): void {
    if (id) {
      this.sectionId = id;
    }

    this.sectionSelected = this.currentActivity.formatos
      .find((formato) => formato.id === Number(this.formatoId))
      .sections.find((section) => section.id === Number(this.sectionId));

    console.log("console.log(this.sectionSelected)-", this.sectionSelected);
  }

  private setCollapsableNav(): void {
    this.menuData = [
      {
        id: "formatos",
        title: "Formatos",
        type: "group",
        children: [],
      },
    ];

    /*this.menuData[0].children.push({
      id: "fotografia",
      title: "Fotografía",
      type: "basic",
      link: `/admin/actividades/validation/fotografias`,
    });*/
    this.currentActivity.formatos.forEach((formato, index) => {
      this.menuData[0].children.push({
        id: formato.id,
        title: formato.name,
        type: "collapsable",
        link: `/admin/actividades/validation/${this.currentIdActivity}/${formato.id}`,
        children: [],
      });

      formato.sections.forEach((section) => {
        this.menuData[0].children[index].children.push({
          id: section.id,
          title: section.name,
          type: "basic",
          link: `/admin/actividades/validation/${this.currentIdActivity}/${formato.id}/${section.id}`,
        });
      });
    });

    this.menuData[0].children.push({
      id: "fotografia",
      title: "Fotografía",
      type: "basic",
      link: `/admin/actividades/validation/fotografias`,
    });
  }

  validate(): void {
    this.matDialog.open(DialogValidateFormatComponent, { width: "500px" });
  }

  addComment(): void {
    this.matDialog.open(DialogAddCommentComponent, { width: "500px" });
  }

  deleteComment(): void {}
}
