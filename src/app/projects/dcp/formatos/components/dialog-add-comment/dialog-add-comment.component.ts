import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { EditarFormatoService } from "../../editar-formato/editar-formato.service";

@Component({
  selector: "app-dialog-add-comment",
  templateUrl: "./dialog-add-comment.component.html",
  styleUrls: ["./dialog-add-comment.component.scss"],
})
export class DialogAddCommentComponent implements OnInit {
  comment = new FormControl("", Validators.required);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public matDialog: MatDialogRef<DialogAddCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _editarFormatoService: EditarFormatoService
  ) {}

  ngOnInit(): void {
    const section = this.data.data.find(
      (x) => x.id === Number(this.data.sectionId)
    );
    this.comment.setValue(section.grupos[this.data.groupIndex].comentarios);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  async updateObservedParam() {
    return this.data.data.map((section: any) => {
      if (section.id === Number(this.data.sectionId)) {
        return section.grupos.map((group: any, index: number) => {
          if (index === Number(this.data.groupIndex)) {
            group.comentarios = this.comment.value;
            group.observar = true;
            group.observado = true;
          }
        });
      }
    });
  }

  async submit() {
    await this.updateObservedParam();

    const payload = {
      secciones: this.data.data,
      idFormato: this.data.idFormato,
    };
    this.matDialog.close();
    this._editarFormatoService
      .saveAssignation(payload)
      .subscribe(() => this.matDialog.close());
  }
}
