import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

//ANIMATION
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: "ui-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger("rotatedState", [
      state("default", style({ transform: "rotate(0)" })),
      state("rotated", style({ transform: "rotate(90deg)" })),
      state("rotated180", style({ transform: "rotate(180deg)" })),
      state("rotated270", style({ transform: "rotate(270deg)" })),
      state("rotated360", style({ transform: "rotate(360deg)" })),
      transition("rotated => default", animate("1500ms ease-out")),
      transition("default => rotated", animate("400ms ease-in")),
      transition("rotated => rotated180", animate("1500ms ease-out")),
      transition("rotated180 => rotated270", animate("1500ms ease-out")),
      transition("rotated270 => rotated360", animate("1500ms ease-out")),
      transition("rotated360 => default", animate("1500ms ease-out")),
    ]),
  ],
})
export class UploadFileComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() loading = false;
  @Input() required: boolean;
  @Output() sourceFile: EventEmitter<any> = new EventEmitter();
  @Input() image: SafeUrl = "";
  @Input() editable: boolean;
  @Input() preview: string;

  _file: string = "";
  state = "default";
  dynamicFitImage: string = "unset";
  dinamycWidth: string = "100%";

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["loading"]) {
      this.loading = changes["loading"].currentValue;
      if (!this.loading && this._file !== "") {
        this.image = this.getSantizeUrl(URL.createObjectURL(this._file));
      }
    }
  }

  private rotate90deg(): void {
    this.dynamicFitImage = "25%";
    this.dinamycWidth = "45%";
  }

  private rotate180deg(): void {
    this.dynamicFitImage = "unset";
    this.dinamycWidth = "100%";
  }
  onFileChange(e: any): void {
    this._file = e.target.files[0];
    this.sourceFile.emit(e);
  }

  removePicture(): void {
    this.image = "";
    this.sourceFile.emit();
  }

  private getSantizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  rotate(): void {
    switch (this.state) {
      case "default":
        this.state = "rotated";
        this.rotate90deg();
        break;

      case "rotated":
        this.state = "rotated180";
        this.rotate180deg();
        break;

      case "rotated180":
        this.state = "rotated270";
        this.rotate90deg();
        break;

      case "rotated270":
        this.state = "rotated360";
        this.rotate180deg();
        break;

      case "rotated360":
        this.state = "rotated";
        this.rotate90deg();
        break;

      default:
        this.state = "rotated";
        this.rotate90deg();
    }
  }
}
