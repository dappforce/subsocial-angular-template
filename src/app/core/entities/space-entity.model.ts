import { WithId } from '../base-entity/with-id';

export interface SpaceEntity extends WithId {
  createdByAccount: string;
  createdAtBlock: number;
  createdAtTime: number;
  isUpdated: boolean;
  updatedByAccount: string;
  updatedAtBlock: number;
  updatedAtTime: number;
  contentId: string;
  ownerId: string;
  hidden: boolean;
  handle: string;
  canFollowerCreatePosts: boolean;
  canEveryoneCreatePosts: boolean;
  postsCount: number;
  hiddenPostsCount: number;
  visiblePostsCount: number;
  followersCount: number;
  score: number;
}
