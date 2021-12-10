export const PALLETS = {
  profileFollows: 'profileFollows',
  spaceFollows: 'spaceFollows',
  reactions: 'reactions',
};

export const METHODS = {
  accountFollowers: 'accountFollowers',
  accountsFollowedByAccount: 'accountsFollowedByAccount',
  spaceFollowers: 'spaceFollowers',
  reactionIdsByPostId: 'reactionIdsByPostId',
  postReactionIdByAccount: 'postReactionIdByAccount',
  followSpace: 'followSpace',
  unfollowSpace: 'unfollowSpace',
  followAccount: 'followAccount',
  unfollowAccount: 'unfollowAccount',
  createPostReaction: 'createPostReaction',
  deletePostReaction: 'deletePostReaction',
  updatePostReaction: 'updatePostReaction',
};

export enum KIND {
  UPVOTE = 'Upvote',
  DOWNVOTE = 'Downvote',
}
