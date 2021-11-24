import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

//CONFIG
import { BasicBarChartOptions } from "../../chart-model";

//SERVICES
import { DashboardService } from "../../dashboard.service";

@Component({
  selector: "no-execute-activities-single",
  templateUrl: "./no-execute-activities-single.component.html",
  styleUrls: ["./no-execute-activities-single.component.scss"],
})
export class NoExecuteActivitiesSingleComponent implements OnInit {
  @ViewChild("barChart") barChart: ChartComponent;
  public basicBarChartData: Partial<BasicBarChartOptions>;

  @ViewChild("barChartHor") barChartHor: ChartComponent;
  public basicBarCharHortData: Partial<BasicBarChartOptions>;

  Postergadas = {
    text: "Postergadas 150",
  };
  Causas = {
    text: "Causas",
  };

  constructor(private dashboardService: DashboardService) {
    this.basicBarChartData = this.dashboardService.getPosponedNoExecutedActv();
    this.basicBarCharHortData = this.dashboardService.getCausesNoExecutedActv();
  }

  ngOnInit(): void {}
}
