import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buildingName',
})

export class BuildingnamePipe implements PipeTransform {
  private apAC = [1, 2, 5, 6, 16, 17, 20, 21, 27, 28];
  private apASCH = [36, 37, 39, 40, 45, 46, 47, 48];
  private apShp = [41, 42, 43, 44];
  public transform(value: any, args?: any): any {
    if (this.apAC.indexOf(value) !== -1) {
      return ' Здание 1-3 АС';
    }
    if (this.apASCH.indexOf(value) !== -1) {
      return 'Здание 1-3 АЩ';
    }
    if (this.apShp.indexOf(value) !== -1) {
      return 'Шп. 26';
    }
  }

}
