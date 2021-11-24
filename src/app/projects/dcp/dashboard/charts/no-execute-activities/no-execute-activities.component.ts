import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

//CONFIG
import { StackedBarChartOptions } from "../../chart-model";

//SERVICES
import { DashboardService } from "../../dashboard.service";

@Component({
  selector: "no-execute-activities",
  templateUrl: "./no-execute-activities.component.html",
  styleUrls: ["./no-execute-activities.component.scss"],
})
export class NoExecuteActivitiesComponent implements OnInit {
  @ViewChild("stackedChartNoActv") stackedChartNoActv: ChartComponent;
  public noActivitiesExec: Partial<StackedBarChartOptions>;
  constructor(private dashboardservices: DashboardService) {
    //this.noActivitiesExec = NoCompletedActvBarChart;
    this.noActivitiesExec = this.dashboardservices.getAllNoExecutedActv();
  }

  ngOnInit(): void {}
}
