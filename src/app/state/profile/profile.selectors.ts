import { Profile, profileAdapter, ProfileState } from './profile.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectMyAccountAddress } from '../my-account/my-account.selectors';
import { UserInfo } from '../../core/models/user-info.model';
import { KeyValuePair } from '../../core/models/key-value-pair.model';
import { selectFollowedAccountIdsByCurrentAccount } from '../followed-account-ids/followed-account-ids.selectors';
import { dictionaryToArray } from '../../core/utils';

const { selectIds, selectEntities, selectAll, selectTotal } =
  profileAdapter.getSelectors();

export const selectProfileState =
  createFeatureSelector<ProfileState>('profiles');

export const selectAllProfiles = createSelector(selectProfileState, selectAll);
export const selectProfilesCount = createSelector(
  selectProfileState,
  selectTotal
);
export const selectProfileEntities = createSelector(
  selectProfileState,
  selectEntities
);

export const selectMyAccountProfileData = createSelector(
  selectMyAccountAddress,
  selectProfileEntities,
  (address, profileEntities) => profileEntities[address]
);

export const selectProfileById = (id: string) =>
  createSelector(
    selectProfileEntities,
    (profileEntities) => profileEntities[id]
  );

export const selectProfilesByIds = (ids: string[]) =>
  createSelector(selectProfileEntities, (profileEntities) =>
    dictionaryToArray<Profile>(profileEntities, ids)
  );

export const selectUserInfoByIds = (ids: string[]) =>
  createSelector(
    selectProfileEntities,
    selectFollowedAccountIdsByCurrentAccount,
    (profileEntities, followedAccountsIds) => {
      const usersInfo: UserInfo[] = [];
      ids.forEach((id) => {
        const profile = profileEntities[id];
        if (profile) {
          usersInfo.push({
            userName: profile?.name,
            address: profile.id,
            avatarSrc: profile?.avatar,
            id: profile.id,
            isFollowing: followedAccountsIds.indexOf(profile.id) >= 0,
          });
        }
      });

      return usersInfo;
    }
  );
