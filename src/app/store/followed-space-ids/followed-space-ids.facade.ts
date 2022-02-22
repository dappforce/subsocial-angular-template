import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import { AccountService } from '../../shared/services/account.service';
import { getFollowedSpaceIds } from './followed-space-ids.actions';

@Injectable({
  providedIn: 'root',
})
export class FollowedSpaceIdsFacade {
  constructor(
    private store: Store<AppState>,
    private account: AccountService
  ) {}

  loadMyFollowedSpaceIds() {
    const accountId = this.account.getCurrentAccountId();
    this.store.dispatch(
      getFollowedSpaceIds({ payload: { address: accountId! } })
    );
  }
}
