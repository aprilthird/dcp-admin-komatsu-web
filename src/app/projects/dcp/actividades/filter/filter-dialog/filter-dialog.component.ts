import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ListadoService } from "app/projects/dcp/formatos/listado/listado.services";
import { forkJoin, Subject } from "rxjs";
import { FormatosService } from "app/projects/dcp/formatos/formatos.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-filter-dialog",
  templateUrl: "./filter-dialog.component.html",
  styleUrls: ["./filter-dialog.component.scss"],
})
export class FilterDialogComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  cecos: any = [];
  ces: any = [];
  gps: any = [];
  isFilter: any;

  constructor(
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<FilterDialogComponent>,
    private listadoService: ListadoService,
    private formatServices: FormatosService
  ) {
    this.form = this.fb.group({
      codCeco: new FormControl(""),
      codGp: new FormControl(""),
      codCe: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.getCombos();
    this.getFilters();
  }

  getFilters(): void {
    this.listadoService._filter.subscribe((filter) => {
      this.form.patchValue(filter);
    });
  }

  private getCombos(): void {
    this.loading = true;
    let ceco = this.formatServices
      .obtenerGenereales(1)
      .pipe(map((x) => x.body));
    let gp = this.formatServices.obtenerGenereales(2).pipe(map((x) => x.body));
    let ce = this.formatServices.obtenerGenereales(3).pipe(map((x) => x.body));

    forkJoin([ceco, gp, ce]).subscribe((result) => {
      this.cecos = result[0];
      this.gps = result[1];
      this.ces = result[2];
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  applyFilters(): void {
    this.listadoService
      .getFormatos({
        ...this.form.value,
      })
      .subscribe((resp) => {
        this.matdialigRef.close();
      });
  }

  wipeFilters(): void {
    Object.keys(this.form.value).forEach((key) => {
      this.form.controls[key].setValue(null);
    });
    this.applyFilters();
  }
}
