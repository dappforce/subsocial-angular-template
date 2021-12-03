import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressHidden',
})
export class AddressHiddenPipe implements PipeTransform {
  transform(value: string, length: number = 12): string {
    if (length > value.length) {
      return value;
    } else {
      const index = Math.floor(length / 2);
      return value.substring(0, index) + '...' + value.slice(-index);
    }
  }
}
