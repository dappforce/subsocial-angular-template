import { ACCOUNT_STATUS } from '../../shared/services/account.service';
import { AccountData } from './account.types';

export type SignInModalData = {
  status: ACCOUNT_STATUS;
  accounts?: Array<AccountData>;
};

export type ConnectionModalData = {
  activeTab: 'following' | 'followers';
  followingCount: number;
  followerCount: number;
  address: string;
};

export type FollowersModalData = {
  spaceId: string;
};

export type ReactionModalData = {
  postId: string;
  upvotesCount: number;
  downvotesCount: number;
};
