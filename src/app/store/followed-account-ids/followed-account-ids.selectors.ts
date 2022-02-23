import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectMyAccountData } from '../my-account/my-account.selectors';
import {
  followedAccountIdsAdapter,
  FollowedAccountIdsState,
} from './followed-account-ids.state';

const { selectIds, selectEntities, selectAll, selectTotal } =
  followedAccountIdsAdapter.getSelectors();

export const selectFollowedAccountIdsState =
  createFeatureSelector<FollowedAccountIdsState>('followedAccountIds');

export const selectFollowedSpaceIdsEntities = createSelector(
  selectFollowedAccountIdsState,
  selectEntities
);

export const selectFollowedAccountIdsByCurrentAccount = createSelector(
  selectFollowedSpaceIdsEntities,
  selectMyAccountData,
  (entities, account) => {
    return entities ? entities[account.address]?.followingAccountIds || [] : [];
  }
);
