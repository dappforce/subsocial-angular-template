import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import { DateService } from '../services/date.service';

@Pipe({
  name: 'day',
})
export class DayjsPipe implements PipeTransform {
  constructor(private dateService: DateService) {}

  transform(value: string | number): string {
    return this.dateService.fromNow(value);
  }
}
