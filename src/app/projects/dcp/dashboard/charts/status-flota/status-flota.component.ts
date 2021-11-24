import { Component, ViewChild, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from "ng-apexcharts";

//CONFIG
import { GroupBarChartOptions } from "../../chart-model";

//SERVICES
import { DashboardService } from "../../dashboard.service";

@Component({
  selector: "app-status-flota",
  templateUrl: "./status-flota.component.html",
  styleUrls: ["./status-flota.component.scss"],
})
export class StatusFlotaComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<GroupBarChartOptions>;

  constructor(private dashboardServices: DashboardService) {
    this.chartOptions = this.dashboardServices.getAllStatusFlota();
  }

  ngOnInit(): void {}
}
