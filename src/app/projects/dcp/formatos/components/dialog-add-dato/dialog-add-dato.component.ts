import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { FuseAlertType } from "@fuse/components/alert";
import { AzureService } from "app/core/azure/azure.service";
import { Grupo, TipoParametro } from "app/core/types/formatos.types";
import { EditarFormatoService } from "../../editar-formato/editar-formato.service";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-dialog-add-dato",
  templateUrl: "./dialog-add-dato.component.html",
  styleUrls: ["./dialog-add-dato.component.scss"],
})
export class DialogAddDatoComponent implements OnInit {
  @Input() data: Grupo;
  @Input() edit: any;
  @Output() success: EventEmitter<any> = new EventEmitter();
  image: string = "";

  loading: boolean = false;
  tiposDatos: any;

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };

  form: FormGroup = this.fb.group({
    idParametro: ["", Validators.required],
    placeholder: ["", Validators.required],
    label: ["", Validators.required],
    visible: [true],
    obligatorio: [true],
    editable: [true],
    minCaracteres: [null],
    maxCaracteres: [null],
    regex: [""],
    fila: ["", Validators.required],
    columna: ["", Validators.required],
    dato: [""],
  });
  imageLoading: boolean;

  //SELECT CONFIG
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  options: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddDatoComponent>,
    private _editarFormatoService: EditarFormatoService,
    private _azureService: AzureService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.tiposDatos = this._editarFormatoService.datos();
  }

  addOption(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    if (value) {
      this.options.push({ name: value });
      const optionSelect = this.options.map((option) => option.name).join();
      this.form.get("dato").setValue(optionSelect);
    }

    event.chipInput!.clear();
  }

  removeOption(option: any): void {
    const index = this.options.indexOf(option);

    if (index >= 0) {
      this.options.splice(index, 1);
      const optionSelect = this.options.map((option) => option.name).join();
      this.form.get("dato").setValue(optionSelect);
    }
  }

  ngOnInit(): void {
    if (this.edit) {
      this.form.setValue({
        idParametro: this.edit.idParametro,
        placeholder: this.edit.placeholder,
        label: this.edit.label,
        visible: this.edit.visible,
        obligatorio: this.edit.obligatorio,
        editable: this.edit.editable,
        minCaracteres: this.edit.minCaracteres,
        maxCaracteres: this.edit.maxCaracteres,
        regex: this.edit.regex,
        fila: this.edit.fila,
        columna: this.edit.columna,
        dato: this.edit.dato,
      });
      this.onChageParametro();
    }

    // Si es vertical siempre la columna será 1
    if (this.data.pos === "v") {
      this.form.get("columna").setValue(1);
      this.form.get("columna").disable();
    }
  }

  onSubmit() {
    if (this.form.valid && !this.loading) {
      this.alert.type = null;
      this.loading = true;
      const { parametros, ...data } = this.data;
      const body = { ...data, parametros: [] };

      //debugger;
      body.parametros.push({
        ...this.form.value,
        idParametroGrupo:
          parametros.length > 0 ? parametros[0].idParametroGrupo : 0,
        idGrupo: body.id,
        activo: true,
        ...(this.edit ? { id: this.edit.id } : {}),
      });
      this._editarFormatoService.createDato(body).subscribe(
        (response) => {
          this.loading = false;
          if (response.success) {
            this.success.emit(response.body.filter((e) => e.activo));
            setTimeout(() => {
              this.dialogRef.close();
            }, 100);
          } else {
            let errorMessage: string;
            if (
              response.message === "No puede existir una fila y columna igual"
            ) {
              errorMessage =
                "La posición de dicha fila y columna ya existe!, no puede ser la misma";
            } else {
              errorMessage = response.message;
            }
            this.alert = {
              type: "error",
              message: errorMessage,
            };
          }
        },
        (error) => {
          console.log("error", error);
          this.loading = false;
        }
      );
    }
  }

  /**
   * Actualización de las validaciones de los campos
   */
  onChageParametro() {
    const values = this.form.value;

    switch (this.form.get("idParametro").value) {
      case TipoParametro.SELECCION:
        if (values.dato && values.dato.length > 0) {
          const optionSelect = values.dato.split(",");
          optionSelect.map((option) => this.options.push({ name: option }));
        }
        this.form.clearValidators();
        this.form = this.fb.group({
          idParametro: [values.idParametro, Validators.required],
          placeholder: [values.placeholder],
          label: [values.label, Validators.required],
          visible: [values.visible],
          obligatorio: [values.obligatorio],
          editable: [values.editable],
          minCaracteres: [values.minCaracteres],
          maxCaracteres: [values.maxCaracteres],
          regex: [values.regex],
          fila: [values.fila, Validators.required],
          columna: [values.columna, Validators.required],
          dato: values.dato,
        });
        this.form.get("regex").disable();
        this.form.get("minCaracteres").disable();
        this.form.get("maxCaracteres").disable();

        break;

      case TipoParametro.TEXTO:
      case TipoParametro.AREA_TEXTO:
        this.form.clearValidators();
        this.form = this.fb.group({
          idParametro: [values.idParametro, Validators.required],
          placeholder: [values.placeholder, Validators.required],
          label: [values.label, Validators.required],
          visible: [values.visible],
          obligatorio: [values.obligatorio],
          editable: [values.editable],
          minCaracteres: [values.minCaracteres],
          maxCaracteres: [values.maxCaracteres],
          regex: [values.regex],
          fila: [values.fila, Validators.required],
          columna: [values.columna, Validators.required],
        });
        break;

      case TipoParametro.FECHA:
      case TipoParametro.UPLOAD:
      case TipoParametro.IMAGEN:
      case TipoParametro.FIRMA:
        this.image = "";
        this.form.clearValidators();
        this.form = this.fb.group({
          idParametro: [values.idParametro, Validators.required],
          placeholder: [values.placeholder],
          label: [values.label, Validators.required],
          visible: [values.visible],
          obligatorio: [values.obligatorio],
          editable: [values.editable],
          minCaracteres: [null],
          maxCaracteres: [null],
          regex: [null],
          fila: [values.fila, Validators.required],
          columna: [values.columna, Validators.required],
          dato: values.dato,
        });

        if (
          this.form.get("dato").value !== "" &&
          this.form.get("dato").value !== null
        ) {
          this.image = this._azureService.getResourceUrlComplete(
            this.form.get("dato").value
          );
        }

        this.form.addControl("dato", new FormControl(null));
        this.form.get("regex").disable();
        this.form.get("minCaracteres").disable();
        this.form.get("maxCaracteres").disable();
        break;

      case TipoParametro.NUMERICO:
        this.form.clearValidators();
        this.form = this.fb.group({
          idParametro: [values.idParametro, Validators.required],
          placeholder: [values.placeholder, Validators.required],
          label: [values.placeholder, Validators.required],
          visible: [values.visible],
          obligatorio: [values.obligatorio],
          editable: [values.editable],
          minCaracteres: [values.minCaracteres],
          maxCaracteres: [values.maxCaracteres],
          regex: [null],
          fila: [values.fila, Validators.required],
          columna: [values.columna, Validators.required],
        });
        this.form.get("regex").disable();
        this.form.get("minCaracteres").disable();
        this.form.get("maxCaracteres").disable();
        break;

      case TipoParametro.LABEL:
        this.form.clearValidators();
        this.form = this.fb.group({
          idParametro: [values.idParametro, Validators.required],
          placeholder: [""],
          label: [values.label, Validators.required],
          visible: [true],
          obligatorio: [true],
          editable: [false],
          minCaracteres: [null],
          maxCaracteres: [null],
          regex: [null],
          fila: [values.fila, Validators.required],
          columna: [values.columna, Validators.required],
        });
        this.form.get("placeholder").disable();
        this.form.get("visible").disable();
        this.form.get("obligatorio").disable();
        this.form.get("editable").disable();
        this.form.get("minCaracteres").disable();
        this.form.get("maxCaracteres").disable();
        this.form.get("regex").disable();
        break;

      case TipoParametro.CHECKBOX:
        this.form.clearValidators();
        this.form = this.fb.group({
          idParametro: [values.idParametro, Validators.required],
          placeholder: [""],
          label: [values.label, Validators.required],
          visible: [values.visible],
          obligatorio: [values.obligatorio],
          editable: [values.editable],
          minCaracteres: [null],
          maxCaracteres: [null],
          regex: [null],
          fila: [values.fila, Validators.required],
          columna: [values.columna, Validators.required],
        });
        this.form.get("placeholder").disable();
        this.form.get("minCaracteres").disable();
        this.form.get("maxCaracteres").disable();
        this.form.get("regex").disable();
        break;
    }

    // Si es vertical siempre la columna será 1
    if (this.data.pos === "v") {
      this.form.get("columna").setValue(1);
      this.form.get("columna").disable();
    }
  }

  getErrorMessage(input: string) {
    const control = this.form.get(input);

    if (control.hasError("required")) {
      return "Campo requerido";
    }
    return control.hasError("email") ? "Formato de correo incorrecto" : "";
  }

  async onChageFile(event: any) {
    if (event) {
      const { target } = event;
      const file = target.files[0];
      const blob = new Blob([file], { type: file.type });
      this.imageLoading = true;

      try {
        const response = await this._azureService.uploadFile(blob, file.name);
        this.form.get("dato").setValue(response.uuidFileName);
        this.image = this._azureService.getResourceUrlComplete(
          response.uuidFileName
        );
      } catch (e) {}
      this.imageLoading = false;
    } else {
      this.form.get("dato").setValue(null);
      this.image = "";
    }
  }

  onkeyDownEvent(event): boolean {
    return (
      event.keyCode !== 69 &&
      event.keyCode !== 189 &&
      event.keyCode !== 187 &&
      event.keyCode !== 190
    );
  }
}
