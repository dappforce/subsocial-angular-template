import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TransferStateService {
  constructor(private transferState: TransferState) {}

  public set<T>(key: string, object: T) {
    const stateKey = makeStateKey<T>(key);
    this.transferState.set<T>(stateKey, object);
  }

  public get<T>(key: string): T {
    const stateKey = makeStateKey<T>(key);
    return this.transferState.get<T>(stateKey, <any>null);
  }

  public remove<T>(key: string) {
    const stateKey = makeStateKey<T>(key);
    this.transferState.remove<T>(stateKey);
  }
}
