import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

const pipe = new DatePipe('en-US');

@Pipe({
  name: 'dateTimeFormat',
})

export class DatetimeformatPipe implements PipeTransform {
  public transform(value: any, format?: string): any {
    const newDate = value.replace(/\s/g, 'T');
    return pipe.transform(newDate, !(format) ? 'HH:mm:ss' : format);
  }

}
