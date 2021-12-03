import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as updateLocale from 'dayjs/plugin/updateLocale';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {
    dayjs.extend(relativeTime);
    dayjs.extend(updateLocale);
    dayjs.updateLocale('en', {
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        m: 'a minute',
        mm: '%dm',
        h: 'an hour',
        hh: '%dh',
        d: 'a day',
        dd: '%dd',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
      },
    });
  }

  fromNow(date: string | number) {
    const diff = dayjs().diff(dayjs(date), 'days');

    if (diff < 7) {
      return dayjs(date).fromNow().toLowerCase();
    } else if (diff > 7 && diff < 365) {
      return dayjs(date).format('DD MMM');
    } else {
      return dayjs(date).format('DD MMM YY');
    }
  }
}
