import { APP_INITIALIZER, inject, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import {
  defaultInterpolationFormat,
  I18NextLoadResult,
  I18NextModule,
  I18NEXT_SERVICE,
  ITranslationService,
} from 'angular-i18next';
import HttpApi from 'i18next-http-backend';
import * as Backend from 'i18next-node-fs-backend';
import { join } from 'path';

export const AVAILABLE_LANGUAGE = ['en', 'ru'];

export function appInit(i18next: ITranslationService) {
  const isServer = inject(PLATFORM_ID) === 'server';

  const i18nextOptions = {
    whitelist: AVAILABLE_LANGUAGE,
    fallbackLng: 'en',
    debug: false,
    returnEmptyString: false,
    ns: ['translation', 'validation', 'error'],
    interpolation: {
      format: I18NextModule.interpolationFormat(defaultInterpolationFormat),
    },
    backend: {
      loadPath: isServer
        ? join(__dirname, '../browser/assets/i18next/{{lng}}.json')
        : 'assets/i18next/{{lng}}.json',
    },
  };

  return () => {
    let promise: Promise<I18NextLoadResult>;
    if (isServer) {
      promise = i18next.use(Backend).init(i18nextOptions);
    } else {
      promise = i18next.use(HttpApi).init(i18nextOptions);
    }
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true,
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory,
  },
];
