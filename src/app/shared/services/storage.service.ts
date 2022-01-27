import { Inject, Injectable } from '@angular/core';

export const STORAGE_KEYS = {
  accountId: 'accountId',
  lang: 'lang',
};

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setCurrentAccountId(id: string) {
    localStorage.setItem(STORAGE_KEYS.accountId, id);
  }

  getAccountId() {
    return localStorage.getItem(STORAGE_KEYS.accountId);
  }

  removeAccountId() {
    localStorage.removeItem(STORAGE_KEYS.accountId);
  }

  setLang(lang: string) {
    this.set(STORAGE_KEYS.lang, lang);
  }

  getLang() {
    return this.get(STORAGE_KEYS.lang);
  }

  get(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }

  set(key: string, obj: any) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}
