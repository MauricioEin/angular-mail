import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number): string {
    const date = new Date(value)
    const now = new Date()
    if (date.toLocaleDateString() === now.toLocaleDateString()) return 'shortTime'
    if (date.getFullYear() === now.getFullYear()) return 'MMM d'
    return 'shortDate'
  }

}
