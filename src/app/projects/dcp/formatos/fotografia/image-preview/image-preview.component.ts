import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { AzureService } from "app/core/azure/azure.service";
import { UserService } from "app/core/user/user.service";
import { User } from "app/core/user/user.types";
import { UiDialogsComponent } from "app/shared/ui/ui-dialogs/ui-dialogs.component";
import { b64toBlob } from "app/shared/utils/b64ToBlob";
import { dataURLtoFile } from "app/shared/utils/dataUrlTofile";
import { fileToDataUri } from "app/shared/utils/fileToDataUri";
import {
  ImageCroppedEvent,
  ImageTransform,
  LoadedImage,
} from "ngx-image-cropper";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FormatosService } from "../../formatos.service";

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
  step = 1;
  remark = "sin remarcar";

  @ViewChild("canvas", { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild("fileInput")
  fileInput: ElementRef<HTMLInputElement>;

  private context: CanvasRenderingContext2D;
  pruebaCroppedReady2: any;
  pruebaCroppedReady: any;
  imageName = "";
  image;
  imageLoading;
  b64Image: any = "";
  sendingImage = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  user: User;

  fileChangeEvent(event: any): void {
    const { target } = event;
    this.imageName = target.files[0].name;
    this.imageChangedEvent = event;
    this.step = 2;
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
    this.readCanvasWithoutRemark(img);
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
  constructor(
    public matDialog: MatDialogRef<ImagePreviewComponent>,
    private dialog: MatDialog,
    private _azureService: AzureService,
    private formatService: FormatosService,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.matDialog.beforeClosed().subscribe(() => {});
    if (this.data?.idImage) {
      /*this.image = this.setImage(this.data?.ruta);
      this.setEditImage();
      this.step = 2;*/
    }
  }

  private setEditImage(): void {
    const toDataURL = () =>
      fetch(this.image)
        .then((response) => response.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );

    toDataURL().then((dataUrl) => {
      this.imageChangedEvent = dataURLtoFile(dataUrl, "name");
    });
  }

  getUserInfo(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  ngOnInit(): void {
    //this.drawOnImage();
  }

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.getUserInfo();
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

    let isDrawing;

    this.canvas.nativeElement.onmousedown = (e: any) => {
      this.step = 3;
      isDrawing = true;
      this.remark = "";
      this.context.beginPath();
      this.context.lineWidth = 10;
      this.context.strokeStyle = "black";
      this.context.lineJoin = "round";
      this.context.lineCap = "round";
      this.context.moveTo(e.clientX - 220, e.clientY - 150);
      this.b64Image = this.canvas.nativeElement.toDataURL();
    };

    this.canvas.nativeElement.onmousemove = (e) => {
      //resizeEvent();
      if (isDrawing) {
        this.context.lineTo(e.clientX - 220, e.clientY - 150);
        this.context.stroke();
      }
    };

    this.canvas.nativeElement.onmouseup = () => {
      //resizeEvent();
      isDrawing = false;
      this.context.closePath();
    };
  }

  croppedFinish(): void {
    if (!this.cropped) {
      this.cropped = !this.cropped;
    } else {
      this.matDialog.close();
    }
  }

  async sendImageToAzure() {
    this.sendingImage = true;
    const contentType = "image/png";
    const blob = b64toBlob(this.b64Image, contentType);
    this.imageLoading = true;

    try {
      const response = await this._azureService.uploadFile(blob, "png");
      this.image = response.uuidFileName;
      await this.sendImage();
    } catch (e) {}
    this.imageLoading = false;
  }

  private async sendImage() {
    let id = 0;
    if (this.data?.idImage) {
      id = this.data.idImage;
      //this.image = this.setImage(this.data?.ruta);
    }
    const payload = {
      idActividadFormato: this.data.idFormatActivity,
      activo: true,
      nombre: this.user.nombres[0].toUpperCase() + this.user.apellidos,
      ruta: this.image,
      mime: "string",
      ext: "string",
      visible: true,
      id: id,
    };
    this.formatService.postDocument(payload).subscribe(
      (resp) => {
        this.sendingImage = false;
        this.matDialog.close();
      },
      (err) => {
        this.dialog.open(UiDialogsComponent, {
          data: {
            title: "Error",
            message: err?.error ? err.error : "Error de conexión",
          },
        });
        this.sendingImage = false;
        this.matDialog.close();
      }
    );
  }

  private readCanvasWithoutRemark(image = null): void {
    if (image) {
      const imageWidth = image.width;
      const imageHeight = image.height;
      this.canvas.nativeElement.width = imageWidth;
      this.canvas.nativeElement.height = imageHeight;
      this.context.drawImage(image, 0, 0, imageWidth, imageHeight);

      this.remark = "";
      this.context.beginPath();
      this.context.lineWidth = 10;
      this.context.strokeStyle = "black";
      this.context.lineJoin = "round";
      this.context.lineCap = "round";
      this.b64Image = this.canvas.nativeElement.toDataURL();
    }
  }

  setImage(src: string): string {
    return this._azureService.getResourceUrlComplete(src);
  }
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
