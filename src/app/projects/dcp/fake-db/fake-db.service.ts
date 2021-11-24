import { Injectable } from "@angular/core";
import { DelayCode } from "./delayed-code";
import { NoExecutedActFakeDB } from "./no-executed";
import { FlotaDataFakeDB } from "./status-flota";

@Injectable({
  providedIn: "root",
})
export class FakeDbService {
  constructor() {}

  createDb() {
    return {
      //FLOTA
      all_status_flota: FlotaDataFakeDB.AllStatusXFlota,
      single_status_flota: FlotaDataFakeDB.SingleStatusXFlota,
      single_basic_bar_chart_flota: FlotaDataFakeDB.BasiBarChart,

      //NO EXECUTED ACTIVITIES
      all_no_executed: NoExecutedActFakeDB.NoCompletedActvBarChart,
      posponed_no_execued: NoExecutedActFakeDB.BasiBarChartNoExec,
      causes_no_execued: NoExecutedActFakeDB.BasiBarChartNoExecCausas,

      //DELAYED CODE
      delayed_code: DelayCode.DelayedCode,
    };
  }
}
