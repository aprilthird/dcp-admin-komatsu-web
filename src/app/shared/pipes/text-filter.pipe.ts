import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "textFilter",
})
export class TextFilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} mainArr
   * @param {string} searchText
   * @param {string} property
   * @returns {any}
   */
  transform(mainArr: any[], searchText: string): any[] {
    if (!mainArr) {
      return [];
    }

    if (!searchText) {
      return mainArr;
    }

    return mainArr.filter((each) => {
      console.log(each);
      //searchText = searchText.toLocaleLowerCase();
      //return each.name.toLocaleLowerCase().includes(searchText);
      return each.name.includes(searchText);
    });
  }
}
