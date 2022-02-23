import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { ActivatedRoute } from "@angular/router";

//Thrid libraries
import { ImageCroppedEvent, LoadedImage } from "ngx-image-cropper";

//COMPONENTS
import { ImagePreviewComponent } from "./image-preview/image-preview.component";

//SERVICES
import { FormatosService } from "../formatos.service";
import { AzureService } from "app/core/azure/azure.service";
import { ActivitiesService } from "../../actividades/activities.service";
import { Subject } from "rxjs";
import { GalleryImage } from "app/shared/models/formatos";

@Component({
  selector: "app-fotografia",
  templateUrl: "./fotografia.component.html",
  styleUrls: ["./fotografia.component.scss"],
})
export class FotografiaComponent implements OnInit, OnDestroy {
  imageChangedEvent: any = "";
  croppedImage: any = "";
  loaded = false;
  idFormatActivity: number;
  gallery: GalleryImage[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  constructor(
    private formatosService: FormatosService,
    private activeRoute: ActivatedRoute,
    private _azureService: AzureService,
    private matDialog: MatDialog,
    private _fuseConfirmationService: FuseConfirmationService,
    private _activitiesService: ActivitiesService
  ) {
    this.getIdFormatActivity();
  }

  ngOnInit(): void {
    this.getGallery();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  preview(idImage?: number, ruta?: string): void {
    this.matDialog
      .open(ImagePreviewComponent, {
        data: {
          idFormatActivity: this.idFormatActivity,
          idImage: idImage,
          ruta: ruta,
        },
      })
      .afterClosed()
      .subscribe(() => this.getGallery());
  }

  delete(image: GalleryImage): void {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar imagen",
      message: "¿Estás seguro que deseas eliminar esta imagen?",
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
          id: image.id,
          activo: false,
          ruta: image.ruta,
          descripcion: image.ruta,
          nombre: image.nombre,
        };
        this.formatosService.postDocument(paylod).subscribe((resp) => {
          this.getGallery();
        });
      }
    });
  }

  editImage(imageDate: GalleryImage): void {}

  getIdFormatActivity(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.idFormatActivity = Number(params["params"]["idFormatoActividad"]);
    });
  }

  getGallery(): void {
    this.formatosService.getGallery(this.idFormatActivity).subscribe((resp) => {
      this.gallery = resp.body;
      this.loaded = true;
    });
  }

  setImage(src: string): string {
    return this._azureService.getResourceUrlComplete(src);
  }
}
