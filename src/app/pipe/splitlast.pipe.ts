import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitlast',
})
export class SplitlastPipe implements PipeTransform {

  public transform(value: string, [separator]: any): string {
    const splits = value.split(separator);
    if (splits.length > 1) {
      return splits.pop();
    }
    return null;
  }

}
