import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModeloI } from "../modelo-model";
import { ModelosService } from "../modelos.service";

@Component({
  selector: "app-dialog-add-modelos",
  templateUrl: "./dialog-add-modelos.component.html",
  styleUrls: ["./dialog-add-modelos.component.scss"],
})
export class DialogAddModelosComponent implements OnInit {
  form: FormGroup;
  matErrorMsg = "Dato obligatorio";
  initData: ModeloI;
  isEdit: boolean;
  modeloId: number;
  isLoading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modeloService: ModelosService,
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<DialogAddModelosComponent>
  ) {
    if (this.data) {
      this.isEdit = true;
      this.initData = this.data;
      this.modeloId = this.data.id;
    }
    this.form = this.fb.group({
      nombre: new FormControl(this.initData?.nombre, Validators.required),
      estado: new FormControl(this.initData?.nestado === "Activo" ? 1 : 0),
    });
  }

  ngOnInit(): void {}

  submit(isEdit): void {
    this.isLoading = true;

    if (isEdit) {
      this.form.addControl("id", new FormControl(this.modeloId));
    }

    this.modeloService.postModelo(this.form.value).subscribe(() => {
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
}
