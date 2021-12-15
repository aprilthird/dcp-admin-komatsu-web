import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "groupPosition",
})
export class GroupPositionPipe implements PipeTransform {
  transform(value: string): string {
    if (value === "v") return "Vertical (Lista)";
    return "Horizontal (Grilla)";
  }
}
