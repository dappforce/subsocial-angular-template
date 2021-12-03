import { profileAdapter, ProfileState } from './profile.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectMyAccountAddress } from '../my-account/my-account.selectors';
import { selectContentEntities } from '../content/content.selectors';
import { ProfileComponentData } from '../../core/types/profile-component-data.type';
import { ProfileContent } from '@subsocial/api/flat-subsocial/dto';
import { environment } from '../../../environments/environment';
import { Content } from '../../core/types/content.type';
import { UserInfo } from '../../core/models/user-info.model';
import { KeyValuePair } from '../../core/models/key-value-pair.model';

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
  selectContentEntities,
  (address, profileEntities, contentEntities) =>
    extractProfileData(profileEntities, contentEntities, address)
);

export const selectProfileDataById = (id: string) =>
  createSelector(
    selectProfileEntities,
    selectContentEntities,
    (profileEntities, contentEntities) =>
      extractProfileData(profileEntities, contentEntities, id)
  );

export const selectUserInfoByIds = (ids: string[]) =>
  createSelector(
    selectProfileEntities,
    selectContentEntities,
    (profileEntities, contentEntities) => {
      const usersInfo: KeyValuePair<UserInfo> = {};
      ids.forEach((id) => {
        const profile = profileEntities[id];
        if (profile) {
          let content: ProfileContent | undefined;
          if (profile.contentId) {
            content = contentEntities[profile.contentId] as ProfileContent;
          }

          usersInfo[profile.id] = {
            userName: content?.name,
            address: profile.id,
            avatarSrc: content?.avatar,
            id: profile.id,
            isFollowing: false,
          };
        }
      });

      return usersInfo;
    }
  );

const extractProfileData = (
  profileEntities: any,
  contentEntities: any,
  id: string
) => {
  const struct = profileEntities[id];
  if (struct) {
    const profileComponentData: ProfileComponentData = {
      address: id,
      followersCount: struct.followersCount,
      followingCount: struct.followingAccountsCount,
    };
    if (struct?.contentId) {
      const content = contentEntities[struct.contentId] as ProfileContent;
      if (content) {
        profileComponentData.avatar = content.avatar;
        profileComponentData.name = content.name;
        profileComponentData.summary = content.summary;
      }
    }

    return profileComponentData;
  }

  return undefined;
};
