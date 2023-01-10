import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    value = value.trim()
    if (!value.length)
      return ''
    return value[0].toUpperCase() + value.slice(1)
  }

}
