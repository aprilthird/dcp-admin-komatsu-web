import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AzureService } from "app/core/azure/azure.service";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"],
})
export class UploadImageComponent implements OnInit {
  @Output() data: EventEmitter<any> = new EventEmitter();
  loading: boolean;
  filesLoading: boolean;
  image: string = "";

  constructor(
    public dialogRef: MatDialogRef<UploadImageComponent>,
    private _azureService: AzureService
  ) {}

  ngOnInit(): void {}

  async onChageFile(event) {
    const { target } = event;
    const file = target.files[0];
    const blob = new Blob([file], { type: file.type });
    this.filesLoading = true;
    try {
      const response = await this._azureService.uploadFile(blob, file.name);
      this.image = response.uuidFileName;
      this.data.emit(response.uuidFileName);
    } catch (e) {}
    this.filesLoading = false;
  }
}
