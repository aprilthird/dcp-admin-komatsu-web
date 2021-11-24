import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { UserService } from "app/core/user/user.service";
import { User } from "app/core/user/user.types";

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
import { Observable } from "rxjs";

//FAKE DATA
import { filter } from "./filters/fake-db/fake-db";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  user: User;
  isLoading: boolean;
  data = filter;
  _allFlotas = true;
  _allNoExecuted = true;

  constructor(private _router: Router, private _userService: UserService) {
    this._userService.user$;
  }

  ngOnInit(): void {
    // Attach SVG fill fixer to all ApexCharts
    window["Apex"] = {
      chart: {
        events: {
          mounted: (chart: any, options?: any): void => {
            this._fixSvgFill(chart.el);
          },
          updated: (chart: any, options?: any): void => {
            this._fixSvgFill(chart.el);
          },
        },
      },
    };
    this._prepareChartData();

    // Subscribe to user changes
    this._userService.user$.subscribe((user: User) => {
      this.user = user;
    });
  }

  allFlotas(event: MatTabChangeEvent): void {
    if (event.index === 0) {
      this._allFlotas = true;
    } else {
      this._allFlotas = false;
    }
  }

  allNoExecuted(event: MatTabChangeEvent): void {
    if (event.index === 0) {
      this._allNoExecuted = true;
    } else {
      this._allNoExecuted = false;
    }
  }

  /**
   * Prepare the chart data from the data
   *
   * @private
   */
  private _prepareChartData(): void {
    this.chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    };
  }

  /**
   * Fix the SVG fill references. This fix must be applied to all ApexCharts
   * charts in order to fix 'black color on gradient fills on certain browsers'
   * issue caused by the '<base>' tag.
   *
   * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
   *
   * @param element
   * @private
   */
  private _fixSvgFill(element: Element): void {
    // Current URL
    const currentURL = this._router.url;

    // 1. Find all elements with 'fill' attribute within the element
    // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
    // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
    Array.from(element.querySelectorAll("*[fill]"))
      .filter((el) => el.getAttribute("fill").indexOf("url(") !== -1)
      .forEach((el) => {
        const attrVal = el.getAttribute("fill");
        el.setAttribute(
          "fill",
          `url(${currentURL}${attrVal.slice(attrVal.indexOf("#"))}`
        );
      });
  }
}
