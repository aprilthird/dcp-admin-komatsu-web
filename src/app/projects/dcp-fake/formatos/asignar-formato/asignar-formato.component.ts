import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { Formato } from "app/core/types/formatos.types";
import { Observable, Subject } from "rxjs";
import { DialogAddAsignarComponent } from "../components/dialog-add-asignar/dialog-add-asignar.component";
import { EditarFormatoService } from "../editar-formato/editar-formato.service";
import { AsignarFormatoService } from "./asignar-formato.service";

@Component({
  selector: "app-asignar-formato",
  templateUrl: "./asignar-formato.component.html",
  styleUrls: ["./asignar-formato.component.scss"],
})
export class AsignarFormatoComponent implements OnInit {
  isLoading: boolean = false;
  formato$: Observable<Formato>;
  usuarios: any;
  pagination$: Observable<any>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _editarFormatoService: EditarFormatoService,
    private _asignarFormatoService: AsignarFormatoService,
    private _routeActived: ActivatedRoute,
    private _matDialog: MatDialog
  ) {
    this.formato$ = this._editarFormatoService.formato$;
  }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  loadData() {
    this.isLoading = true;
    this._asignarFormatoService
      .getUsuarios()
      .subscribe((response) => {
        this.usuarios = response.body.data;
        this.isLoading = false;
      });
  }

  changeAsignacion(usuario) {
    const dialogRef = this._matDialog.open(DialogAddAsignarComponent, {
      autoFocus: false,
      width: "376px",
    });

    dialogRef.componentInstance.data = {
      idUsuario: usuario.id,
      idFormato: this._routeActived.snapshot.params.id
    }
  }
}
