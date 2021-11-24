import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddDatoComponent } from '../../components/dialog-add-dato/dialog-add-dato.component';
import { Grupo, TipoParametro } from 'app/core/types/formatos.types';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  @Input('data') data:Grupo;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  clickNewDato() {
    const dialogRef = this.dialog.open(DialogAddDatoComponent, {
      autoFocus: false,
      width: '842px',
    });

    dialogRef.componentInstance.data = this.data;
    dialogRef.componentInstance.success.subscribe((parametros) => {
      this.data.parametros = parametros;
    })
  }

  clickEditDato(parametro) {
    const dialogRef = this.dialog.open(DialogAddDatoComponent, {
      autoFocus: false,
      width: '842px',
    });

    dialogRef.componentInstance.data = this.data;
    dialogRef.componentInstance.edit = parametro;

    dialogRef.componentInstance.success.subscribe((parametros) => {
      this.data.parametros = parametros;
    })
  }

  getTipo(tipo) {
    switch(tipo) {
      case TipoParametro.TEXTO: return 'Texto';
      case TipoParametro.NUMERICO: return 'Numérico';
      case TipoParametro.FIRMA: return 'Firma';
      case TipoParametro.FECHA: return 'Fecha';
      case TipoParametro.UPLOAD: return 'Carga';
      case TipoParametro.AREA_TEXTO: return 'Area de texto';
      case TipoParametro.IMAGEN: return 'Imagen';
      default : '';
    }
  }

}
