import { Inject, Injectable } from '@angular/core';

export const STORAGE_KEYS = {
  accountId: 'accountId',
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
}
