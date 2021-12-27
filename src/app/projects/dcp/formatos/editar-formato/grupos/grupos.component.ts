import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddDatoComponent } from "../../components/dialog-add-dato/dialog-add-dato.component";
import { Grupo, TipoParametro } from "app/core/types/formatos.types";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { EditarFormatoService } from "../editar-formato.service";
import { DialogAddGrupoComponent } from "../../components/dialog-add-grupo/dialog-add-grupo.component";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.component.html",
  styleUrls: ["./grupos.component.scss"],
})
export class GruposComponent implements OnInit {
  @Input("data") data: Grupo;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private dialog: MatDialog,
    private _fuseConfirmationService: FuseConfirmationService,
    private _editarFormatoService: EditarFormatoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.data.parametros = this.data.parametros.filter((e) => e.activo);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar Dato",
      message: "¿Estás seguro que deseas eliminar el dato?",
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

  deleteGroup(): void {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar grupo",
      message: "¿Estás seguro que desea eliminar éste grupo?",

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
      const data = {
        id: this.data.id,
        activo: false,
      };

      if (result === "confirmed") {
        this._editarFormatoService.createGrupo(data).subscribe((resp) => {
          this.data.activo = false;
        });
      }
    });
  }

  updateGroup(): void {
    let idFormat: number;
    this.activatedRoute.params.subscribe(
      (params) => (idFormat = Number(params["id"]))
    );
    const dialogRef = this.dialog.open(DialogAddGrupoComponent, {
      autoFocus: false,
      width: "376px",
    });

    dialogRef.componentInstance.data = this.data;
    dialogRef.componentInstance.idFormato = idFormat;
  }
}
