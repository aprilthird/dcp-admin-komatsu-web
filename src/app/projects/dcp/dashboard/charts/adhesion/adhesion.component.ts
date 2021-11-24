import { Component, OnInit } from "@angular/core";
//import { DxChartModule } from "devextreme-angular";

@Component({
  selector: "app-adhesion",
  templateUrl: "./adhesion.component.html",
  styleUrls: ["./adhesion.component.scss"],
})
export class AdhesionComponent implements OnInit {
  //dataSource: ComplaintsWithPercent[] = this.getComplaintsData();

  constructor() {}

  ngOnInit(): void {}

  /*getComplaintsData(): ComplaintsWithPercent[] {
    var data = complaintsData.sort(function (a, b) {
        return b.count - a.count;
      }),
      totalCount = data.reduce(function (prevValue, item) {
        return prevValue + item.count;
      }, 0),
      cumulativeCount = 0;
    return data.map(function (item, index) {
      cumulativeCount += item.count;
      return {
        complaint: item.complaint,
        count: item.count,
        cumulativePercent: Math.round((cumulativeCount * 100) / totalCount),
      };
    });
  }

  customizeTooltip = (info: any) => {
    return {
      html:
        "<div><div class='tooltip-header'>" +
        info.argumentText +
        "</div>" +
        "<div class='tooltip-body'><div class='series-name'>" +
        "<span class='top-series-name'>" +
        info.points[0].seriesName +
        "</span>" +
        ": </div><div class='value-text'>" +
        "<span class='top-series-value'>" +
        info.points[0].valueText +
        "</span>" +
        "</div><div class='series-name'>" +
        "<span class='bottom-series-name'>" +
        info.points[1].seriesName +
        "</span>" +
        ": </div><div class='value-text'>" +
        "<span class='bottom-series-value'>" +
        info.points[1].valueText +
        "</span>" +
        "% </div></div></div>",
    };
  };

  customizeLabelText = (info: any) => {
    return info.valueText + "%";
  };*/
}

export class ComplaintsWithPercent {
  complaint: string;
  count: number;
  cumulativePercent: number;
}

class Complaints {
  complaint: string;
  count: number;
}

let complaintsData: Complaints[] = [
  { complaint: "S01", count: 780 },
  { complaint: "S02", count: 120 },
  { complaint: "S03", count: 52 },
  { complaint: "S04", count: 1123 },
  { complaint: "S05", count: 321 },
  { complaint: "S06", count: 89 },
  { complaint: "S07", count: 222 },
  { complaint: "S08", count: 1123 },
  { complaint: "S09", count: 321 },
  { complaint: "S10", count: 89 },
  { complaint: "S11", count: 222 },
];
