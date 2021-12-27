import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { AzureService } from "app/core/azure/azure.service";
import { UiDialogsComponent } from "app/shared/ui/ui-dialogs/ui-dialogs.component";
import { Subject } from "rxjs";
import { FormatosService } from "../formatos.service";

@Component({
  selector: "app-attach-documents",
  templateUrl: "./attach-documents.component.html",
  styleUrls: ["./attach-documents.component.scss"],
})
export class AttachDocumentsComponent implements OnInit {
  loaded: boolean;
  documents = [];
  form: FormGroup = this.fb.group({
    nombre: new FormControl(""),
    file: new FormControl(""),
  });
  filesLoading: boolean;
  id: number;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private formatService: FormatosService,
    private dialog: MatDialog,
    private _azureService: AzureService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _fuseConfirmationService: FuseConfirmationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => (this.id = Number(params["idFormatoActividad"]))
    );
    this.getDocument();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private getDocument(): void {
    this.formatService.getGallery(this.id).subscribe((resp) => {
      this.documents = resp.body;
      this.loaded = true;
    });
  }

  postDocument(): void {
    const payload = {
      idActividadFormato: this.id,
      activo: true,
      nombre: this.form.controls["nombre"].value,
      ruta: this.form.controls["file"].value,
      mime: "string",
      ext: "string",
      visible: true,
      idTipo: 1,
      id: 0,
    };
    this.formatService.postDocument(payload).subscribe(
      (resp) => {
        this.loaded = false;
        this.getDocument();
      },
      (err) => {
        this.dialog.open(UiDialogsComponent, {
          data: {
            title: "Error",
            message: err?.error ? err.error : "Error de conexión",
          },
        });
        this.loaded = false;
      }
    );
  }

  async onChageFile(event: any) {
    if (event) {
      const { target } = event;
      const file = target.files[0];
      const blob = new Blob([file], { type: file.type });
      this.loaded = true;
      try {
        const response = await this._azureService.uploadFile(blob, file.name);
        this.form.get("nombre").setValue(file.name);
        this.form.get("file").setValue(response.uuidFileName);
        this.postDocument();
      } catch (e) {}
    } else {
      this.form.get("file").setValue("");
    }
  }

  delete(document: any): void {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar documento",
      message: "¿Estás seguro que deseas eliminar este documento?",
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
        const paylod = {
          id: document.id,
          activo: false,
          ruta: document.ruta,
          descripcion: document.ruta,
          nombre: document.nombre,
        };
        this.formatService.postDocument(paylod).subscribe((resp) => {
          this.getDocument();
        });
      }
    });
  }

  clickOpenFile(resourceName): void {
    window.open(
      this._azureService.getResourceUrlComplete(resourceName),
      "blank"
    );
  }
}
