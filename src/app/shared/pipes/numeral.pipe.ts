import { Pipe, PipeTransform } from '@angular/core';
import * as numeral from 'numeral';

@Pipe({
  name: 'numeral',
})
export class NumeralPipe implements PipeTransform {
  transform(value: number): string {
    return numeral(value).format('0,0a');
  }
}
