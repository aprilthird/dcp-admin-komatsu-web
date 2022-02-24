import { Component, Input, OnInit } from "@angular/core";
import { EditarFormatoService } from "../../editar-formato/editar-formato.service";

@Component({
  selector: "app-dialog-previsualizar",
  templateUrl: "./dialog-previsualizar.component.html",
  styleUrls: ["./dialog-previsualizar.component.scss"],
})
export class DialogPrevisualizarComponent implements OnInit {
  @Input("idFormato") idFormato;

  constructor(private _editarFormatoService: EditarFormatoService) {}

  ngOnInit(): void {
    this._editarFormatoService
      .getObtenerFormatoCompleto(this.idFormato)
      .subscribe((response) => {});
  }
}
