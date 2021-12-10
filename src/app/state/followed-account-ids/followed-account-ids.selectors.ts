import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectMyAccountAddress } from '../my-account/my-account.selectors';
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
  selectMyAccountAddress,
  (entities, address) => {
    return entities ? entities[address]?.followingAccountIds || [] : [];
  }
);
