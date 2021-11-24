import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivitiesService } from "../../activities.service";

@Component({
  selector: "app-assign-bay",
  templateUrl: "./assign-bay.component.html",
  styleUrls: ["./assign-bay.component.scss"],
})
export class AssignBayComponent implements OnInit {
  searchLoader: boolean;

  items = Bahias;
  preloadedFormatsData = [];

  constructor(
    public matdialigRef: MatDialogRef<AssignBayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activitiesService: ActivitiesService
  ) {
    if (data.type === "formato") {
      this.items = formats;
    } else {
      this.items = Bahias;
    }
  }

  ngOnInit(): void {
    this.preloadedFormats();
  }

  searchLoading(): void {
    this.searchLoader = true;
    setTimeout(() => {
      this.searchLoader = false;
    }, 1500);
  }

  assignFormat(format?: any): void {
    const newFormats = { ...this.preloadedFormatsData, format };
    this.activitiesService.preloadedFormats.next(newFormats);
  }

  private preloadedFormats(): void {
    this.activitiesService.preloadedFormats.subscribe((formats: any) => {
      this.preloadedFormatsData = formats;
    });
  }
}

const Bahias = [
  {
    name: "bahía 1",
    id: "1",
  },
  {
    name: "bahía 2",
    id: "3",
  },
  {
    name: "bahía 3",
    id: "3",
  },
];

const formats = [
  { name: "Formato FM01", complete: true, porcentage: "75%", id: "1" },
  { name: "Formato FM02", complete: true, porcentage: "75%", id: "2" },
  { name: "Formato FM03", complete: true, porcentage: "75%", id: "3" },
  { name: "Formato FM04", complete: false, porcentage: "75%", id: "4" },
];
