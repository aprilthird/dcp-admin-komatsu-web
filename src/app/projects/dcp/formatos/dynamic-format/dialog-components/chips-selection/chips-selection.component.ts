import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialogRef } from "@angular/material/dialog";
import { ParamI } from "app/shared/models/formatos";

@Component({
  selector: "app-chips-selection",
  templateUrl: "./chips-selection.component.html",
  styleUrls: ["./chips-selection.component.scss"],
})
export class ChipsSelectionComponent implements OnInit {
  @Input() paramData: ParamI;
  @Output() data: EventEmitter<any> = new EventEmitter();
  dato: string;
  loading: boolean;

  //CHIPS CONFIG
  options = [];
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(public dialogRef: MatDialogRef<ChipsSelectionComponent>) {}

  ngOnInit(): void {
    if (this.paramData.dato && this.paramData.dato.length > 0) {
      let optionSelect = [];
      if (this.paramData.idParametro === 10) {
        optionSelect = this.paramData.dato.split(",");
      } else optionSelect = [];
      optionSelect.map((option) => this.options.push({ name: option }));
    }
  }

  addOption(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    if (value) {
      this.options.push({ name: value });
      const optionSelect = this.options.map((option) => option.name).join();
      this.dato = optionSelect;
    }

    event.chipInput!.clear();
  }

  removeOption(option: any): void {
    const index = this.options.indexOf(option);

    if (index >= 0) {
      this.options.splice(index, 1);
      const optionSelect = this.options.map((option) => option.name).join();
      this.dato = optionSelect;
    }
  }

  onSubmit(): void {
    this.data.emit(this.dato);
  }
}
