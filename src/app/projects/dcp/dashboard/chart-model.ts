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
  ApexResponsive,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
} from "ng-apexcharts";

export type GroupBarChartOptions = {
  series: ApexAxisChartSeries;
  //chart: ApexChart;
  chart: any;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  color?: string[];
};

export type SimplePieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: any;
  responsive: ApexResponsive[];
  labels: any;
};

export type BasicBarChartOptions = {
  series: ApexAxisChartSeries;
  chart: any;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors?: string[];
  fill?: any;
};

export type StackedBarChartOptions = {
  series: any; //ApexAxisChartSeries;
  chart: any; //ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: any; //ApexLegend;
};
