import { Injectable } from '@angular/core';
import {
  I18N_DAYJS_RELATIVE_TIME_KEY,
  RelativeTimeProps,
  relativeTimeUnits,
  SubDate,
  SubsocialDateLocaleProps,
} from '@subsocial/utils';
import { I18NextPipe } from 'angular-i18next';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  BASE_I18N_KEY = I18N_DAYJS_RELATIVE_TIME_KEY;
  constructor(private t: I18NextPipe) {}

  getDate(date: string | number) {
    return SubDate.formatDate(date);
  }

  updateLocale(lang: string) {
    const subDateLocale: SubsocialDateLocaleProps = {
      localeName: lang,
      relativeTime: this.fillRelativeTime(),
    };

    SubDate.updateLocale(subDateLocale);
  }

  private fillRelativeTime() {
    const relativeTime = Object.assign({}, relativeTimeUnits);

    for (let key in relativeTimeUnits) {
      const unit = relativeTimeUnits[key as keyof RelativeTimeProps];
      relativeTime[key as keyof RelativeTimeProps] = this.t.transform(
        this.combineI18nKey(key),
        {
          unit,
        }
      );
    }

    return relativeTime;
  }

  private combineI18nKey(key: string) {
    return `${this.BASE_I18N_KEY}.${key}`;
  }
}
