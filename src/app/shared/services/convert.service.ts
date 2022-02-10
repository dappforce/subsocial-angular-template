import { Injectable } from '@angular/core';
import * as BN from 'bn.js';
import { environment } from '../../../environments/environment';
import { AnyId } from '@subsocial/types/dto';
import { PostId } from '@subsocial/types/substrate/interfaces';

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

  public idToPostId(id: AnyId): PostId {
    return this.idToBn(id) as unknown as PostId;
  }

  public idToBn(id: AnyId): BN {
    return BN.isBN(id) ? id : new BN(id);
  }

  public convertBalance(value: string) {
    const balance = Number.parseFloat(value);
    return balance * Math.pow(10, environment.decimals);
  }
}
