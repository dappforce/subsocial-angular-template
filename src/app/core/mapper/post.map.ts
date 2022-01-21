import { Post } from '../models/post/post-list-item.model';
import { getPostLink } from '../utils';
import { ProfileContent, SpaceData } from '@subsocial/api/flat-subsocial/dto';

export const mapPostDTOToPost = (
  post: any,
  space: SpaceData | undefined,
  profileContent: ProfileContent | undefined
): Post => {
  return {
    id: post.struct.id,
    ownerId: post.struct.ownerId,
    ownerImageUrl: profileContent?.avatar || '',
    spaceName: space?.content?.name || '',
    title: post.content!.title,
    summary: post.content!.summary,
    imageUrl: post.content!.image,
    createdAtTime: post.struct.createdAtTime,
    repliesCount: post.struct.repliesCount,
    hiddenRepliesCount: post.struct.hiddenRepliesCount,
    visibleRepliesCount: post.struct.visibleRepliesCount,
    sharesCount: post.struct.visibleRepliesCount,
    upvotesCount: post.struct.upvotesCount,
    downvotesCount: post.struct.downvotesCount,
    isSharedPost: post.struct.isSharedPost,
    isComment: post.struct.isComment,
    isShowMore: post.content!.isShowMore,
    ownerName: profileContent?.name || '',
    postLink: getPostLink(
      '',
      post.content!.title
        ? post.content!.title
        : post.content!.summary.slice(0, 30),
      post.struct.id,
      post.struct.isComment ? 'comments' : post.struct.spaceId!
    ),
    hidden: post.struct.hidden,
    spaceHidden: space === undefined || !!space?.struct.hidden,
    body: post.content!.body,
    tags: post.content!.tags,
    spaceId: post.struct.spaceId,
    link: post.content!.link,
    sharedPostId: post.struct.sharedPostId,
    spaceLink: '/' + space?.struct.id,
    rootPostId: post.struct.rootPostId,
    parentId: post.struct.parentId,
  };
};
