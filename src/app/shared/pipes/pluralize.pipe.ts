import { Pipe, PipeTransform } from '@angular/core';
import * as pluralize from 'pluralize';

@Pipe({
  name: 'pluralize',
})
export class PluralizePipe implements PipeTransform {
  transform(value: number | null, word: string): string {
    return value !== null ? pluralize(word, value) : '';
  }
}
