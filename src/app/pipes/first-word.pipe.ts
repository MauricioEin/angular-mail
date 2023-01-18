import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstWord'
})
export class FirstWordPipe implements PipeTransform {

  transform(value: string): string {
    if (value.indexOf(' ') === -1) return value
    value = value.slice(0, value.indexOf(' '))
    return value

  }

}
