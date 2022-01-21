export type CommentItemData = {
  skipComment: boolean;
  postId: string;
  rootPostId: string;
  ownerId: string;
  profileName: string;
  createdAtTime: number;
  hidden: boolean;
  avatar: string;
  commentText: string;
  upvoteCount: number;
  downvoteCount: number;
  replyCount: number;
  isMyComment: boolean;
  upvoteActive?: boolean;
  downvoteActive?: boolean;
  reactionId?: string;
};
