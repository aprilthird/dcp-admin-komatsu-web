import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  currentTableData: BehaviorSubject<any[]> = new BehaviorSubject(null);

  constructor() {}

  get currentTableData$(): Observable<any[]> {
    return this.currentTableData.asObservable();
  }

  set currentTableData$(data: any) {
    this.currentTableData.next(data);
  }
}
