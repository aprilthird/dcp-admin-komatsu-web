import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Formato, Seccion } from "app/core/types/formatos.types";
import { Subject } from "rxjs";
import { EditarFormatoService } from "../editar-formato/editar-formato.service";
import { FormatosService } from "../formatos.service";

@Component({
  selector: "app-dynamic-format",
  templateUrl: "./dynamic-format.component.html",
  styleUrls: ["./dynamic-format.component.scss"],
})
export class DynamicFormatComponent implements OnInit {
  isLoading: boolean;
  sections;
  formato: Formato;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  idFormat: number;
  ceCo: Formato;
  ce: Formato;
  gp: Formato;
  isActa: boolean;

  constructor(
    private _formatosService: FormatosService,
    private _editarFormatoService: EditarFormatoService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe((params: any) =>
      this._formatosService._idFormulario.next(Number(params.id))
    );
  }

  ngOnInit(): void {
    this.getSections();
    this.getFormatInfo();
  }

  ngOnDestry(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getFormatInfo(): void {
    this._editarFormatoService._formato.subscribe((format) => {
      this.formato = format;
    });
    this._editarFormatoService._ceCo.subscribe((ceco) => (this.ceCo = ceco));
    this._editarFormatoService._ce.subscribe((ce) => (this.ce = ce));
    this._editarFormatoService._gp.subscribe((gp) => (this.gp = gp));

    this._activatedRoute.params.subscribe((params) => {
      this.idFormat = Number(params["id"]);
    });
    if (!this.ceCo && !this.ce && !this.gp) {
      this.isActa = true;
      if (this.sections.length === 0) this.postSection();
    }
  }

  private getSections(): void {
    this._editarFormatoService._secciones.subscribe(
      (sections) => (this.sections = sections)
    );
  }

  postSection(): void {
    this._editarFormatoService
      .createSeccion(
        {
          idFormato: this.idFormat,
          nombre: "Nueva Sección",
          activo: true,
        },
        true
      )
      .subscribe(() => []);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }

  trackByFn(index: number, item: Seccion): number {
    return item.id;
  }
}
