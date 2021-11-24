import { Component, Input, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddDatoComponent } from "../../components/dialog-add-dato/dialog-add-dato.component";
import { Grupo, TipoParametro } from "app/core/types/formatos.types";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { EditarFormatoService } from "../editar-formato.service";

@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.component.html",
  styleUrls: ["./grupos.component.scss"],
})
export class GruposComponent implements OnInit {
  @Input("data") data: Grupo;

  constructor(
    private dialog: MatDialog,
    private _fuseConfirmationService: FuseConfirmationService,
    private _editarFormatoService: EditarFormatoService
  ) {}

  ngOnInit(): void {
    this.data.parametros = this.data.parametros.filter((e) => e.activo);
  }

  clickNewDato() {
    const dialogRef = this.dialog.open(DialogAddDatoComponent, {
      autoFocus: false,
      width: "842px",
      disableClose: true,
    });

    dialogRef.componentInstance.data = this.data;
    dialogRef.componentInstance.success.subscribe((parametros) => {
      this.data.parametros = parametros;
    });
  }

  clickEditDato(parametro) {
    const dialogRef = this.dialog.open(DialogAddDatoComponent, {
      autoFocus: false,
      width: "842px",
      disableClose: true,
    });

    dialogRef.componentInstance.data = this.data;
    dialogRef.componentInstance.edit = parametro;

    dialogRef.componentInstance.success.subscribe((parametros) => {
      this.data.parametros = parametros;
    });
  }

  getTipo(tipo) {
    switch (tipo) {
      case TipoParametro.TEXTO:
        return "Texto";
      case TipoParametro.NUMERICO:
        return "Numérico";
      case TipoParametro.FIRMA:
        return "Firma";
      case TipoParametro.FECHA:
        return "Fecha";
      case TipoParametro.UPLOAD:
        return "Carga";
      case TipoParametro.AREA_TEXTO:
        return "Area de texto";
      case TipoParametro.IMAGEN:
        return "Imagen";
      case TipoParametro.SELECCION:
        return "Selección";
      case TipoParametro.CHECKBOX:
        return "Checkbox";
      case TipoParametro.LABEL:
        return "Label";
      case TipoParametro.SELECCION:
        return "Selección";
      default:
        "";
    }
  }

  /**
   * Delete product
   */
  clickDeleteParametro(parametro): void {
    console.log(this.data);
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar parametro",
      message: "¿Estás seguro que deseas eliminar el parametro?",
      icon: {
        name: "heroicons_outline:trash",
        color: "primary",
      },
      actions: {
        confirm: {
          label: "Sí, eliminar",
          color: "primary",
        },
        cancel: {
          label: "No",
        },
      },
      dismissible: true,
    });

    dialogRef.beforeClosed().subscribe((result) => {
      if (result === "confirmed") {
        const data = { ...this.data };
        //debugger
        parametro.activo = false;
        data.parametros = [parametro];
        this._editarFormatoService.createDato(data).subscribe((response) => {
          this.data.parametros = response.body.filter((e) => e.activo);
        });
      }
    });
  }
}
