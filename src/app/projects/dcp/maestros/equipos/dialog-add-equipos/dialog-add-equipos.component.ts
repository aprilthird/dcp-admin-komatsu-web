import { X } from "@angular/cdk/keycodes";
import { Component, Inject, OnInit } from "@angular/core";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { FlotasService } from "../../flotas/flotas.service";
import { MaestrosService } from "../../maestros.service";
import { ModelosService } from "../../modelos/modelos.service";

//MODELS
import { EquipoI } from "../equipo-model";

//SERVICES
import { EquiposService } from "../equipos.service";

@Component({
  selector: "app-dialog-add-equipos",
  templateUrl: "./dialog-add-equipos.component.html",
  styleUrls: ["./dialog-add-equipos.component.scss"],
})
export class DialogAddEquiposComponent implements OnInit {
  form: FormGroup;
  matErrorMsg = "Dato obligatorio";
  initData: EquipoI;
  isEdit: boolean;
  equipoId: number;
  isLoading: boolean;
  cliente: string;
  horometro: string;

  modelosData: any;
  flotasData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private equiposService: EquiposService,
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<DialogAddEquiposComponent>,
    private maestServ: MaestrosService
  ) {
    if (this.data) {
      this.isEdit = true;
      this.initData = this.data;
      this.equipoId = this.data.id;
    }
    this.getSelectsData();
    this.form = this.fb.group({
      nombre: new FormControl(this.initData?.nombre, Validators.required),
      tag: new FormControl(this.initData?.tag, Validators.required),
      modelo: new FormControl(this.initData?.modelo, Validators.required),
      flota: new FormControl(this.initData?.flota, Validators.required),
      cliente: new FormControl(this.initData?.cliente, Validators.required),
      horometro: new FormControl(this.initData?.horometro, Validators.required),
      estado: new FormControl(this.initData?.nestado === "Activo" ? 1 : 0),
    });

    this.form.controls["cliente"].disable();
    this.form.controls["horometro"].disable();
  }

  ngOnInit(): void {}

  getSelectsData(): void {
    this.isLoading = true;
    const mod = this.maestServ.getList(5).pipe(map((x: any) => x.body.data));
    const flt = this.maestServ.getList(6).pipe(map((x: any) => x.body.data));

    forkJoin([mod, flt]).subscribe((resp) => {
      this.modelosData = resp[0];
      this.flotasData = resp[1];
      this.isLoading = false;
      this.setDinamycData();
    });
  }

  setDinamycData(): void {
    if (this.isEdit) {
      const currentClient = this.flotasData.find(
        (x: any) => x.nombre === this.initData.flota
      ).cliente;

      const currentHorometro = this.flotasData.find(
        (x: any) => x.nombre === this.initData.flota
      ).horometro;

      this.form.controls["cliente"].setValue(currentClient);
      this.form.controls["horometro"].setValue(currentHorometro);
    }
  }

  submit(isEdit): void {
    this.isLoading = true;

    if (isEdit) {
      this.form.addControl("id", new FormControl(this.equipoId));
    }

    this.equiposService.postEquipo(this.form.value).subscribe((resp) => {
      setTimeout(() => {
        this.isLoading = false;
        this.matdialigRef.close();
      }, 1000);
    });
  }

  check(event): void {
    setTimeout(() => {
      this.form.controls["estado"].setValue(event.checked ? 1 : 0);
    }, 200);
  }

  flotaSelected(e: any): void {
    const currentClient = this.flotasData.find(
      (x: any) => x.nombre === e.value
    ).cliente;

    const currentHorometro = this.flotasData.find(
      (x: any) => x.nombre === e.value
    ).horometro;

    this.form.controls["cliente"].setValue(currentClient);
    this.form.controls["horometro"].setValue(currentHorometro);
  }
}
