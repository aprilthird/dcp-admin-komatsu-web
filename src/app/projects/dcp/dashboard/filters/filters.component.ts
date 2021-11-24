import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { filter } from "./fake-db/fake-db";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit {
  filter: FormGroup;
  data = filter;

  constructor(private fb: FormBuilder) {
    this.filter = this.fb.group({
      cliente: [""],
      rango_fecha: [""],
      tipo_solicitud: [""],
      clase_actividad: [""],
    });
  }

  ngOnInit(): void {}
}
