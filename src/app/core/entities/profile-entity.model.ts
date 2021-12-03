export interface ProfileEntity {
  id: string;
  followersCount: number;
  followingAccountsCount: number;
  followingSpacesCount: number;
  reputation: number;
  hasProfile: boolean;
  createdByAccount: string;
  createdAtBlock: number;
  createdAtTime: number;
  isUpdated: boolean;
  updatedByAccount: string;
  updatedAtBlock: number;
  updatedAtTime: number;
  contentId: string;
}
