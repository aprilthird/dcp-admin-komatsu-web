import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

//CONFIG
import { StackedBarChartOptions } from "../../chart-model";

//SERVICES
import { DashboardService } from "../../dashboard.service";

@Component({
  selector: "deleyed-code",
  templateUrl: "./deleyed-code.component.html",
  styleUrls: ["./deleyed-code.component.scss"],
})
export class DeleyedCodeComponent implements OnInit {
  @ViewChild("stackedChartDelay") stackedChartDelay: ChartComponent;
  public delayCode: Partial<StackedBarChartOptions>;

  constructor(private dashboardService: DashboardService) {
    this.delayCode = this.dashboardService.getDelayedCode();
  }

  ngOnInit(): void {}
}
