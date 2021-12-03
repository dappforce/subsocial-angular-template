import { Pipe, PipeTransform } from '@angular/core';
import * as pluralize from 'pluralize';


@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {

  transform(value: number, word: string): string {
    return pluralize(word, value);
  }

}
