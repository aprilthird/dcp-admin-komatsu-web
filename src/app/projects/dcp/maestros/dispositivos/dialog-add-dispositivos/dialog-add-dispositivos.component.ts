import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { DispositivosService } from "../dispositivos.service";

@Component({
  selector: "app-dialog-add-dispositivos",
  templateUrl: "./dialog-add-dispositivos.component.html",
  styleUrls: ["./dialog-add-dispositivos.component.scss"],
})
export class DialogAddDispositivosComponent implements OnInit {
  form: FormGroup;
  matErrorMsg = "Dato obligatorio";

  constructor(
    private dispositivoService: DispositivosService,
    private fb: FormBuilder,
    public matdialigRef: MatDialogRef<DialogAddDispositivosComponent>
  ) {
    this.form = this.fb.group({
      dispositivo: new FormControl("", Validators.required),
      fecha_creacion: new FormControl("", Validators.required),
      bahia_asignada: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {}

  submit(): void {
    this.dispositivoService
      .postDispositivo(this.form.value)
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
