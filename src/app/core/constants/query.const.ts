export const PALLETS = {
  profileFollows: 'profileFollows',
  spaceFollows: 'spaceFollows',
  reactions: 'reactions',
  posts: 'posts',
  spaces: 'spaces',
  profiles: 'profiles',
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
  createPost: 'createPost',
  updatePost: 'updatePost',
  createSpace: 'createSpace',
  updateSpace: 'updateSpace',
  createProfile: 'createProfile',
  updateProfile: 'updateProfile',
};

export enum KIND {
  UPVOTE = 'Upvote',
  DOWNVOTE = 'Downvote',
}
