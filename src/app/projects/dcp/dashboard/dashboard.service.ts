import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FakeDbService } from "../fake-db/fake-db.service";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient, private fakeDB: FakeDbService) {}

  getAllStatusFlota(): any {
    const endpoint = this.fakeDB.createDb()["all_status_flota"];
    return endpoint;
  }

  getSingleStatusFlota(filter?): any {
    const endpoint = this.fakeDB.createDb()["single_status_flota"];
    return endpoint;
  }

  getSingleBarStatusFlota(filter?): any {
    const endpoint = this.fakeDB.createDb()["single_basic_bar_chart_flota"];
    return endpoint;
  }

  getAllNoExecutedActv(): any {
    const endpoint = this.fakeDB.createDb()["all_no_executed"];
    return endpoint;
  }

  getPosponedNoExecutedActv(filter?): any {
    const endpoint = this.fakeDB.createDb()["posponed_no_execued"];
    return endpoint;
  }

  getCausesNoExecutedActv(filter?): any {
    const endpoint = this.fakeDB.createDb()["causes_no_execued"];
    return endpoint;
  }

  getDelayedCode(filter?): any {
    const endpoint = this.fakeDB.createDb()["delayed_code"];
    return endpoint;
  }
}
