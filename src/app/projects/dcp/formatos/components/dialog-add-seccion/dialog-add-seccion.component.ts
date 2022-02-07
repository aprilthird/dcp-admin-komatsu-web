import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { EditarFormatoService } from "../../editar-formato/editar-formato.service";

@Component({
  selector: "app-dialog-add-seccion",
  templateUrl: "./dialog-add-seccion.component.html",
  styleUrls: ["./dialog-add-seccion.component.scss"],
})
export class DialogAddSeccionComponent implements OnInit, AfterViewInit {
  @Input() idFormato: number;
  @Input() currentSection: any;
  @Output() success: EventEmitter<void> = new EventEmitter();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  payload: any;

  loading: boolean = false;

  form: FormGroup = this.fb.group({
    nombre: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private editarFormatoService: EditarFormatoService,
    public dialogRef: MatDialogRef<DialogAddSeccionComponent>
  ) {}

  ngOnInit(): void {
    this.readSectionData();
  }

  ngAfterViewInit(): void {}

  onSubmit() {
    // if (this.form.valid && !this.loading) {
    //   this.loading = true;
    //   this.editarFormatoService
    //     .createSeccion({
    //       ...this.payload,
    //       nombre: this.form.controls["nombre"].value,
    //       idFormato: Number(this.idFormato),
    //     })
    //     .subscribe(
    //       (response) => {
    //         this.loading = false;
    //         this.success.emit();
    //       },
    //       () => {
    //         this.loading = false;
    //       }
    //     );
    // }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private readSectionData(): void {
    if (this.currentSection) {
      this.form.controls["nombre"].setValue(this.currentSection.nombre);
      this.payload = this.currentSection;
    } else {
      this.payload = this.form.value;
    }
  }

  getErrorMessage(input: string) {
    const control = this.form.get(input);

    if (control.hasError("required")) {
      return "Campo requerido";
    }

    return control.hasError("email") ? "Formato de correo incorrecto" : "";
  }

  preventDefault(): boolean {
    return false;
  }
  //
}
