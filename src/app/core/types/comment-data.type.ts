export type CommentItemData = {
  postId: string;
  ownerId: string;
  profileName: string;
  createdAtTime: number;
  avatar: string;
  commentText: string;
  upvoteCount: number;
  downvoteCount: number;
  replyCount: number;
  upvoteActive?: boolean;
  downvoteActive?: boolean;
};
