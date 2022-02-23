import { Profile, profileAdapter, ProfileState } from './profile.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectMyAccountData } from '../my-account/my-account.selectors';
import { UserInfo } from '../../core/models/user-info.model';
import { selectFollowedAccountIdsByCurrentAccount } from '../followed-account-ids/followed-account-ids.selectors';
import { dictionaryToArray } from '../../core/utils';

const { selectEntities, selectAll, selectTotal } =
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
  selectMyAccountData,
  selectProfileEntities,
  (accountData, profileEntities) => {
    const profile = profileEntities[accountData.address];
    if (profile && !profile?.name)
      return { ...profile, name: accountData.name } as Profile;
    return profile;
  }
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
