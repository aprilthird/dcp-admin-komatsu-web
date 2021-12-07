import { Component, OnInit } from "@angular/core";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { Pagination } from "app/core/types/list.types";
import { Observable, Subject } from "rxjs";
import { ActivityFake } from "../../fake-db/activities/activity-fake-db";
import { ActivitiesService } from "../activities.service";

@Component({
  selector: "list-activities",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  asignaciones$: Observable<any[]>;
  pagination$: Observable<Pagination>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isLoading = false;

  activities: any[];
  assignToBay: boolean;
  isEdit: boolean;
  selectedActivity: any;

  start = new Date().toLocaleDateString("en-US");
  end = new Date().toLocaleDateString("en-US");

  constructor(
    private matDialog: MatDialog,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit(): void {
    //this.getAsignations();
    this.getActivities();
  }

  changePage(): void {}

  getActivities(): void {
    this.activitiesService.getActivities(2).subscribe((_activities: any) => {
      console.log(_activities);
      this.activities = _activities.body.data;
    });
  }

  getAsignations(): void {
    this.activitiesService.activities$.subscribe(
      (_activities: ActivityFake[]) => {
        this.activities = _activities;
      }
    );
  }

  selectActivity(event: MatCheckbox, index?: number): void {
    if (index || index === 0) {
      this.activities[index].checked = event.checked;
    } else {
      this.activities.map(
        (activity: ActivityFake) => (activity.checked = event.checked)
      );
    }

    if (
      this.activities.find(
        (activity: ActivityFake) => activity.checked === true
      )
    ) {
      this.assignToBay = true;
    } else this.assignToBay = false;
  }

  daterange(event): void {
    if (event.startDate) {
      this.start = new Date(event.startDate._d).toLocaleDateString("en-US");
    }
    if (event.endDate) {
      this.end = new Date(event.endDate._d).toLocaleDateString("en-US");
    }
  }

  toggleDetails(actividad): void {
    if (this.selectedActivity && this.selectedActivity.id === actividad.id) {
      this.selectedActivity = null;
      return;
    }
    this.selectedActivity = actividad;
  }
}
