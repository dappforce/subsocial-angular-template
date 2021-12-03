import { Injectable } from '@angular/core';
import * as BN from 'bn.js';

@Injectable({
  providedIn: 'root',
})
export class ConvertService {
  constructor() {}

  public convertToBN(value: string) {
    return new BN(value);
  }

  public convertToBNArray(array: string[]) {
    return array.map((el) => this.convertToBN(el));
  }

  public convertBN(value: BN) {
    return value.toString();
  }

  public convertBNs(bns: Array<BN>) {
    return bns.map((bn) => bn.toString());
  }
}
