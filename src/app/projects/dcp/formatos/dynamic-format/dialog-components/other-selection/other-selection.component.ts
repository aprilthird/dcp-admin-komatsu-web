import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-other-selection",
  templateUrl: "./other-selection.component.html",
  styleUrls: ["./other-selection.component.scss"],
})
export class OtherSelectionComponent implements OnInit {
  loading: boolean = false;
  @Output() success: EventEmitter<any> = new EventEmitter();

  form: FormGroup = this.fb.group({
    min: [null, Validators.required],
    max: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OtherSelectionComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.success.emit(this.form.value);
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
