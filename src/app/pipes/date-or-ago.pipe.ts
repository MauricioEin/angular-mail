import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { formatDistanceToNow } from 'date-fns'

@Pipe({
  name: 'dateOrAgo'
})
export class DateOrAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let datePipe = new DatePipe("en-US");
    let date = new Date(value);
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = diff / (1000 * 60 * 60 * 24);

    if (days < 1) {
        return datePipe.transform(value, 'shortTime')+` (${formatDistanceToNow(date)} ago)`;
    }
    if (days < 14) {
      return datePipe.transform(value, 'MMM d, y, h:mm a')+` (${formatDistanceToNow(date)} ago)`;
    }
    return datePipe.transform(value, 'MMM d, y, h:mm a');
  }
}