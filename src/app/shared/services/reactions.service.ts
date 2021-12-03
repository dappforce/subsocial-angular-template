import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { SubsocialApiService } from './subsocial-api.service';
import { METHODS, PALLETS } from '../../core/constants/query.const';
import { AnyReactionId } from '@subsocial/types';
import { filter, skipWhile, take } from 'rxjs/operators';
import { MyPostReactionsStruct } from '../../state/my-post-reactions/my-post-reactions.state';
import BN from 'bn.js';

@Injectable({
  providedIn: 'root',
})
export class ReactionsService {
  constructor(
    private accountService: AccountService,
    private api: SubsocialApiService
  ) {}

  async getReactionsIdsByPostIds(postIds: string[]) {
    const account = await this.accountService.currentAccount$
      .pipe(
        skipWhile((account) => !account),
        take(1)
      )
      .toPromise();

    if (!account) return;

    const tuples = postIds.map((postId) => [account.id, postId]);

    const reactionIds = await this.api.getSubstrateIdsByMulti({
      pallet: PALLETS.reactions,
      method: METHODS.postReactionIdByAccount,
      tuples,
    });

    const filteredReactionIds: BN[] = [];

    const reactionIdByPostIds = new Map<string, string>();
    tuples.map(([, postIds], index) => {
      const reactionId = reactionIds[index] as unknown as BN;
      if (!reactionId.eqn(0)) {
        reactionIdByPostIds.set(reactionId.toString(), postIds);
        filteredReactionIds.push(reactionId);
      }
    });

    const reactionsRaw = await this.api.substrate.findReactions(
      filteredReactionIds
    );

    return reactionsRaw.map((reactionRaw) => {
      const id = reactionRaw.id.toString();

      return {
        id:
          reactionRaw.created.account.toString() +
          '-' +
          reactionIdByPostIds.get(id),
        reactionId: id,
        kind: reactionRaw.kind.isUpvote ? 'Upvote' : 'Downvote',
      } as MyPostReactionsStruct;
    });
  }
}
