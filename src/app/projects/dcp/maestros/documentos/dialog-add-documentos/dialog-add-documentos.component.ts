import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AzureService } from "app/core/azure/azure.service";
import { ActivitiesService } from "app/projects/dcp/actividades/activities.service";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { DocumentosService } from "../documentos.service";

@Component({
  selector: "app-dialog-add-documentos",
  templateUrl: "./dialog-add-documentos.component.html",
  styleUrls: ["./dialog-add-documentos.component.scss"],
})
export class DialogAddDocumentosComponent implements OnInit {
  form: FormGroup;
  matErrorMsg = "Dato obligatorio";
  isEdit: boolean;
  documentId: number;
  initData: any;
  isLoading: boolean;
  clientsOpt: any;
  equiposOpt: any;
  clase_actividadesOpt: any;
  modelosOpt: any;
  filesLoading: boolean;
  tipo_mttoOpt: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<DialogAddDocumentosComponent>,
    private documentService: DocumentosService,
    private serviceAct: ActivitiesService,
    private _azureService: AzureService
  ) {
    if (this.data) {
      this.isEdit = true;
      this.initData = this.data;
      this.documentId = this.data.id;
    }

    this.form = this.fb.group({
      nombre: new FormControl(this.initData?.nombre, [Validators.required]),
      cliente: new FormControl(this.initData?.cliente),
      modelo: new FormControl(this.initData?.modelo, Validators.required),
      actividad: new FormControl(this.initData?.actividad, Validators.required),
      tipo_mantenimiento: new FormControl(
        this.initData?.tipoMantenimiento,
        Validators.required
      ),
      estado: new FormControl(this.initData?.nestado === "Activo" ? 1 : 0),
      idCliente: new FormControl(),
      mime: new FormControl("documento"),
      ruta: new FormControl("/admin/maestros/agregar_documentos"),
      //entidad: new FormControl(2),
      documentosList: new FormControl(null, Validators.required),
      idModelo: new FormControl(),
      idActividad: new FormControl(),
      idTipoMantenimiento: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getInboxes();
  }

  getInboxes(): void {
    let clients = this.serviceAct.getList(1).pipe(map((x: any) => x.body.data));
    let modelos = this.serviceAct.getList(5).pipe(map((x: any) => x.body.data));
    let c_act = this.serviceAct.getList(7).pipe(map((x: any) => x.body.data));
    let t_mtto = this.serviceAct.getList(9).pipe(map((x: any) => x.body.data));

    forkJoin([clients, modelos, c_act, t_mtto]).subscribe((result: any) => {
      this.clientsOpt = result[0];
      this.modelosOpt = result[1];
      this.clase_actividadesOpt = result[2];
      this.tipo_mttoOpt = result[3];
      this.isLoading = false;
    });
  }

  submit(isEdit): void {
    this.isLoading = true;

    if (isEdit) {
      this.form.addControl("id", new FormControl(this.documentId));
    }

    this.documentService.postDocumento(this.form.value).subscribe((resp) => {
      setTimeout(() => {
        this.isLoading = false;
        this.matdialigRef.close();
      }, 1000);
    });
  }

  check(event): void {
    setTimeout(() => {
      this.form.controls["estado"].setValue(event.checked ? 1 : 0);
    }, 200);
  }

  async onChageFile(event: any) {
    if (event) {
      const { target } = event;
      const file = target.files[0];
      const blob = new Blob([file], { type: file.type });
      this.filesLoading = true;
      try {
        const response = await this._azureService.uploadFile(blob, file.name);
        this.form.get("documentosList").setValue([response.uuidFileName]);
      } catch (e) {}
      this.filesLoading = false;
    } else {
      this.form.get("documentosList").setValue("");
    }
  }

  clickOpenFile(resourceName) {
    window.open(
      this._azureService.getResourceUrlComplete(resourceName),
      "blank"
    );
  }

  setClient(e): void {
    const currentClientId = this.clientsOpt.find(
      (x: any) => e.value === x.id
    ).nombre;
    this.form.controls["cliente"].setValue(currentClientId);
    console.log(this.form.value);
  }

  setModel(e): void {
    const currentModelId = this.modelosOpt.find(
      (x: any) => e.value === x.id
    ).nombre;
    this.form.controls["modelo"].setValue(currentModelId);
    console.log(this.form.value);
  }

  setActivity(e): void {
    const currentActivityId = this.clase_actividadesOpt.find(
      (x: any) => e.value === x.id
    ).nombre;
    this.form.controls["actividad"].setValue(currentActivityId);
    console.log(this.form.value);
  }

  setTipoMtto(e): void {
    const currentTipoMttoId = this.tipo_mttoOpt.find(
      (x: any) => e.value === x.id
    ).nombre;
    this.form.controls["tipo_mantenimiento"].setValue(currentTipoMttoId);
    console.log(this.form.value);
  }
}
