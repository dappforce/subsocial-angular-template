export interface PostEntity {
  createdByAccount: string;
  createdAtBlock: number;
  createdAtTime: number;
  isUpdated: boolean;
  contentId: string;
  id: string;
  ownerId: string;
  hidden: boolean;
  spaceId: string;
  repliesCount: number;
  hiddenRepliesCount: number;
  visibleRepliesCount: number;
  sharesCount: number;
  upvotesCount: number;
  downvotesCount: number;
  score: number;
  isRegularPost: boolean;
  isSharedPost: boolean;
  isComment: boolean;
}
