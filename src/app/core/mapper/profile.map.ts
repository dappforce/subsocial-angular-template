import { Profile } from '../../store/profile/profile.state';
import { ProfileData } from '@subsocial/types/dto';

export const mapProfileDTOToProfile = (
  profileData: ProfileData | undefined,
  id?: string
) => {
  return {
    id: profileData?.struct.id || id,
    followersCount: profileData?.struct.followersCount || 0,
    followingAccountsCount: profileData?.struct.followingAccountsCount || 0,
    followingSpacesCount: profileData?.struct.followingSpacesCount || 0,
    about: profileData?.content?.about || '',
    avatar: profileData?.content?.avatar || '',
    name: profileData?.content?.name || '',
    summary: profileData?.content?.summary || '',
    isShowMore: profileData?.content?.isShowMore || false,
  } as Profile;
};
