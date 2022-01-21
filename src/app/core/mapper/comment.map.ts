import { CommentStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { PostContent, ProfileContent } from '@subsocial/api/flat-subsocial/dto';
import { MyPostReactions } from '../../state/my-post-reactions/my-post-reactions.state';
import { CommentItemData } from '../types/comment-data.type';

export const mapPostToCommentItem = (
  postStruct: CommentStruct,
  profileContent: ProfileContent,
  postContent: PostContent,
  myPostReaction: MyPostReactions | undefined,
  address: string
) => {
  return {
    skipComment: postStruct.hidden && postStruct.ownerId !== address,
    postId: postStruct.id,
    rootPostId: postStruct.rootPostId,
    ownerId: postStruct.ownerId,
    profileName: profileContent?.name,
    createdAtTime: postStruct.createdAtTime,
    avatar: profileContent?.avatar,
    hidden: postStruct.hidden,
    commentText: postContent.body,
    upvoteCount: postStruct.upvotesCount,
    isMyComment: postStruct.ownerId === address,
    downvoteCount: postStruct.downvotesCount,
    replyCount: postStruct.repliesCount,
    upvoteActive: myPostReaction?.kind === 'Upvote',
    downvoteActive: myPostReaction?.kind === 'Downvote',
    reactionId: myPostReaction?.reactionId,
  } as CommentItemData;
};
