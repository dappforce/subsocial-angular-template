import { PostContent, ProfileContent } from '@subsocial/api/flat-subsocial/dto';
import {
  CommentStruct,
  PostStruct,
  SharedPostStruct,
  SpaceStruct,
} from '@subsocial/api/flat-subsocial/flatteners';
import { PostListItemData } from '../models/post/post-list-item.model';
import { environment } from '../../../environments/environment';
import { getPostLink } from '../utils';
import { SpaceContentExtend } from '../models/space/space-list-item.model';
import { MyPostReactionsStruct } from '../../state/my-post-reactions/my-post-reactions.state';

export const mapPostDataToPostListItem = (
  postStruct: SharedPostStruct & CommentStruct,
  postContent: PostContent,
  spaceStruct: SpaceStruct | undefined,
  profileContent: ProfileContent | undefined,
  spaceContent: SpaceContentExtend | undefined,
  myAddress: string,
  myPostReaction?: MyPostReactionsStruct
): PostListItemData => {
  return {
    id: postStruct.id,
    ownerId: postStruct.ownerId,
    ownerImageUrl: profileContent?.avatar || '',
    spaceName: spaceContent?.name || '',
    title: postContent.title,
    summary: postContent.summary,
    imageUrl: postContent.image ? environment.ipfsUrl + postContent.image : '',
    createdAtTime: postStruct.createdAtTime,
    repliesCount: postStruct.repliesCount,
    hiddenRepliesCount: postStruct.hiddenRepliesCount,
    visibleRepliesCount: postStruct.visibleRepliesCount,
    sharesCount: postStruct.visibleRepliesCount,
    upvotesCount: postStruct.upvotesCount,
    downvotesCount: postStruct.downvotesCount,
    isSharedPost: postStruct.isSharedPost,
    isComment: postStruct.isComment,
    isShowMore: postContent.isShowMore,
    ownerName: profileContent?.name || '',
    postLink: getPostLink(
      spaceStruct?.handle,
      postContent.title ? postContent.title : postContent.summary.slice(0, 30),
      postStruct.id,
      postStruct.isComment ? 'comments' : postStruct.spaceId!
    ),
    hidden: postStruct.hidden,
    isMyPost: postStruct.ownerId === myAddress,
    body: postContent.body,
    tags: postContent.tags,
    spaceId: postStruct.spaceId,
    link: postContent.link,
    sharedPostId: postStruct.sharedPostId,
    spaceLink: spaceStruct?.handle
      ? '/' + (spaceStruct.handle ? '@' + spaceStruct.handle : spaceStruct.id)
      : '',
    upvoteActive: myPostReaction?.kind === 'Upvote',
    downvoteActive: myPostReaction?.kind === 'Downvote',
    rootPostId: postStruct.rootPostId,
  };
};
