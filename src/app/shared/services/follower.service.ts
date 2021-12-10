import { Injectable } from '@angular/core';
import { SubsocialApiService } from './subsocial-api.service';
import { FollowedSpaceIdsStruct } from '../../state/followed-space-ids/followed-space-ids.state';
import { selectFollowedSpaceIdsByCurrentAccount } from '../../state/followed-space-ids/followed-space-ids.selectors';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/state';
import { selectFollowedAccountIdsByCurrentAccount } from '../../state/followed-account-ids/followed-account-ids.selectors';
import { FollowedAccountIdsStruct } from '../../state/followed-account-ids/followed-account-ids.state';

@Injectable({
  providedIn: 'root',
})
export class FollowerService {
  constructor(
    private api: SubsocialApiService,
    private store: Store<AppState>
  ) {}

  async loadFollowedSpaceIds(account: string) {
    const spaceIds = await this.api.substrate.spaceIdsFollowedByAccount(
      account
    );

    return {
      id: account,
      followingSpaceIds: spaceIds.map((id) => id.toString()),
    } as FollowedSpaceIdsStruct;
  }

  async loadFollowedAccountIds(account: string) {
    const readyApi = await this.api.substrate.api;
    const accountIds =
      (await readyApi.query.profileFollows.accountsFollowedByAccount(
        account
      )) as unknown as any[];

    return {
      id: account,
      followingAccountIds: accountIds.map((id) => id.toString()),
    } as FollowedAccountIdsStruct;
  }

  checkIfFollowSpace(spaceId: string | undefined) {
    return this.store
      .select(selectFollowedSpaceIdsByCurrentAccount)
      .pipe(map((spaceIds) => !!spaceId && spaceIds.indexOf(spaceId) >= 0));
  }

  checkIfFollowAccount(accountId: string | undefined) {
    return this.store
      .select(selectFollowedAccountIdsByCurrentAccount)
      .pipe(map((ids) => !!accountId && ids.indexOf(accountId) >= 0));
  }
}
