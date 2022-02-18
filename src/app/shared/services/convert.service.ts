import { Injectable } from '@angular/core';
import * as BN from 'bn.js';
import { AnyId } from '@subsocial/types/dto';
import { PostId } from '@subsocial/types/substrate/interfaces';
import { SubsocialApiService } from './subsocial-api.service';
import { idsToBns, idToBn } from '@subsocial/utils';

@Injectable({
  providedIn: 'root',
})
export class ConvertService {
  constructor(private api: SubsocialApiService) {}

  public idToBn(id: AnyId) {
    return idToBn(id);
  }

  public idsToBns(ids: AnyId[]) {
    return idsToBns(ids);
  }

  public convertBN(value: BN) {
    return value.toString();
  }

  public idToPostId(id: AnyId): PostId {
    return this.idToBn(id) as unknown as PostId;
  }

  public convertBalance(value: string) {
    const balance = Number.parseFloat(value);
    return balance * Math.pow(10, this.api.metadata.decimals);
  }
}
