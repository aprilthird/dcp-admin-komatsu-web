import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { AzureService } from "app/core/azure/azure.service";
import { TipoParametro } from "app/core/types/formatos.types";
import { HostListenerConfig } from "app/shared/config/host-listener.config";
import { ParamI } from "app/shared/models/formatos";

@Component({
  selector: "app-read-load-data",
  templateUrl: "./read-load-data.component.html",
  styleUrls: ["./read-load-data.component.scss"],
})
export class ReadLoadDataComponent implements OnInit {
  formField = new FormControl("");
  @Input() parametro: ParamI;
  @Output() outputData = new EventEmitter();
  filesLoading: boolean;

  constructor(
    private _azureService: AzureService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {}

  @HostListener("keypress", ["$event.target"])
  keyPress(classname) {
    const classNameKeypress = (classname as Element).className;
    if (
      classNameKeypress.includes(
        HostListenerConfig.keypress.AUTO_SAVE_FIELD_CLASS
      )
    ) {
      this.sendOutPut();
    }
  }

  ngOnInit(): void {
    let value: any = this.parametro?.valor;
    if (
      this.parametro.idParametro === TipoParametro.NUMERICO ||
      this.parametro.idParametro === TipoParametro.SELECCION
    ) {
      value = Number(this.parametro?.valor);
    } else if (this.parametro.idParametro === TipoParametro.CHECKBOX) {
      value = value === "true" ? true : false;
    }

    if (this.parametro.idParametro === TipoParametro.FECHA) {
      if (value && value !== null && value !== "") {
        this.formField.setValue(this.convertDate(value));
      }
    } else {
      this.formField.setValue(value);
    }
  }

  setImage(src: string): string {
    return this._azureService.getResourceUrlComplete(src);
  }

  async onChageFile(event: any) {
    if (event) {
      const { target } = event;
      const file = target.files[0];
      const blob = new Blob([file], { type: file.type });
      this.filesLoading = true;
      try {
        const response = await this._azureService.uploadFile(blob, file.name);
        this.formField.setValue(response.uuidFileName);
        this.sendOutPut();
      } catch (e) {}
      this.filesLoading = false;
    } else {
      this.formField.setValue("");
      this.sendOutPut();
    }
  }

  removeSign(event): void {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Eliminar firma",
      message: "¿Estás seguro que desea eliminar permanentemente la firma?",

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
        this.submit(event);
      }
    });
  }

  splitOptions(options: string): string[] {
    return options.split(",");
  }

  sendOutPut(): void {
    setTimeout(() => {
      this.outputData.emit({
        ...this.parametro,
        valor: String(this.formField.value),
      });
    });
  }

  selection(): void {
    this.sendOutPut();
  }

  toggleCheck(): void {
    this.sendOutPut();
  }

  dateChange(): void {
    this.convertDate(this.formField.value);
    this.formField.setValue(this.convertDate(this.formField.value));
    setTimeout(() => {
      this.sendOutPut();
    }, 250);
  }

  submit(e): void {}

  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}
