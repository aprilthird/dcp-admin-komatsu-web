import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {
  ImageCroppedEvent,
  ImageTransform,
  LoadedImage,
} from "ngx-image-cropper";

@Component({
  selector: "app-image-preview",
  templateUrl: "./image-preview.component.html",
  styleUrls: ["./image-preview.component.scss"],
})
export class ImagePreviewComponent implements OnInit, AfterViewInit {
  imageChangedEvent: any = "";
  croppedImage: any = "";
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  cropped: boolean;

  @ViewChild("canvas", { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild("fileInput", { static: true })
  fileInput: ElementRef<HTMLInputElement>;

  private context: CanvasRenderingContext2D;
  pruebaCroppedReady2: any;
  pruebaCroppedReady: any;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  async imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    let [file] = this.imageChangedEvent.target.files;
    const fileTmp = dataURLtoFile(event.base64, "Captura de pantalla (1).png");
    file = fileTmp;
    const img: any = document.createElement("img");
    const imgTmp: any = document.createElement("img");
    img.src = await fileToDataUri(file);
    imgTmp.src = await fileToDataUri(fileTmp);
    this.drawOnImage(img);
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
  constructor(public matDialog: MatDialogRef<ImagePreviewComponent>) {}

  ngOnInit(): void {
    //this.drawOnImage();
  }

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext("2d");
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  save(e): void {}

  cancel(): void {}

  private async drawOnImage(image = null) {
    //const canvasElement: any = document.getElementById("canvas");

    // if an image is present,
    // the image passed as parameter is drawn in the canvas
    //console.log("param image ", image);
    //console.log("cropped image ", this.croppedImage);
    if (image) {
      const imageWidth = image.width;
      const imageHeight = image.height;

      // displaying the uploaded image

      // enabling the brush after after the image
      // has been uploaded

      // rescaling the canvas element
      this.canvas.nativeElement.width = imageWidth;
      this.canvas.nativeElement.height = imageHeight;

      this.context.drawImage(image, 0, 0, imageWidth, imageHeight);
    }

    /*const clearElement = document.getElementById("clear");
    clearElement.onclick = () => {
      this.context.clearRect(
        0,
        0,
        this.fileInput.nativeElement.width,
        this.fileInput.nativeElement.height
      );
    };*/

    let isDrawing;

    this.canvas.nativeElement.onmousedown = (e) => {
      isDrawing = true;
      this.context.beginPath();
      this.context.lineWidth = 10;
      this.context.strokeStyle = "black";
      this.context.lineJoin = "round";
      this.context.lineCap = "round";
      this.context.moveTo(e.clientX, e.clientY);
      console.log(e);
    };

    this.canvas.nativeElement.onmousemove = (e) => {
      if (isDrawing) {
        this.context.lineTo(e.clientX, e.clientY);
        this.context.stroke();
      }
    };

    this.canvas.nativeElement.onmouseup = () => {
      isDrawing = false;
      this.context.closePath();
    };
  }

  croppedFinish(): void {
    if (!this.cropped) this.cropped = !this.cropped;
    else {
      this.matDialog.close();
    }
  }
}

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(field);
  });
}

/*function drawOnImage(image = null) {
  const canvasElement: any = document.getElementById("canvas");
  const context = canvasElement.getContext("2d");

  // if an image is present,
  // the image passed as parameter is drawn in the canvas
  if (image) {
    const imageWidth = image.width;
    const imageHeight = image.height;

    // rescaling the canvas element
    canvasElement.width = imageWidth;
    canvasElement.height = imageHeight;

    context.drawImage(image, 0, 0, imageWidth, imageHeight);
  }

  const clearElement = document.getElementById("clear");
  clearElement.onclick = () => {
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
  };

  let isDrawing;

  canvasElement.onmousedown = (e) => {
    isDrawing = true;
    context.beginPath();
    context.lineWidth = 10;
    context.strokeStyle = "black";
    context.lineJoin = "round";
    context.lineCap = "round";
    context.moveTo(e.clientX, e.clientY);
  };

  canvasElement.onmousemove = (e) => {
    if (isDrawing) {
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
    }
  };

  canvasElement.onmouseup = function () {
    isDrawing = false;
    context.closePath();
  };
}*/
