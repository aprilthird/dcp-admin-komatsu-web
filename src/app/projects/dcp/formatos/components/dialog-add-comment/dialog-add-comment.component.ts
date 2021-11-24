import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-dialog-add-comment",
  templateUrl: "./dialog-add-comment.component.html",
  styleUrls: ["./dialog-add-comment.component.scss"],
})
export class DialogAddCommentComponent implements OnInit {
  constructor(public matDialog: MatDialogRef<DialogAddCommentComponent>) {}

  ngOnInit(): void {}

  submit(): void {}
}
