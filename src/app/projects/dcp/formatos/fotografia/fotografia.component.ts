import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ImageCroppedEvent, LoadedImage } from "ngx-image-cropper";

//COMPONENTS
import { ImagePreviewComponent } from "./image-preview/image-preview.component";

@Component({
  selector: "app-fotografia",
  templateUrl: "./fotografia.component.html",
  styleUrls: ["./fotografia.component.scss"],
})
export class FotografiaComponent implements OnInit {
  imageChangedEvent: any = "";
  croppedImage: any = "";

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
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  preview(): void {
    this.matDialog.open(ImagePreviewComponent);
  }
}
