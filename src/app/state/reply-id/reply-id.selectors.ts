import { createFeatureSelector, createSelector } from '@ngrx/store';
import { replyIdAdapter, ReplyIdState } from './reply-id.state';
import { selectPostEntities } from '../post/post.selectors';
import { CommentItemData } from '../../core/types/comment-data.type';
import { selectContentEntities } from '../content/content.selectors';
import { selectProfileEntities } from '../profile/profile.selectors';
import { PostContent, ProfileContent } from '@subsocial/api/flat-subsocial/dto';
import { environment } from '../../../environments/environment';
import { selectMyAccountAddress } from '../my-account/my-account.selectors';
import { selectMyPostReactionsEntities } from '../my-post-reactions/my-post-reactions.selectors';

const { selectIds, selectEntities, selectAll, selectTotal } =
  replyIdAdapter.getSelectors();

export const selectReplyIdsState =
  createFeatureSelector<ReplyIdState>('replyIds');

export const selectAllPReplyIds = createSelector(
  selectReplyIdsState,
  selectAll
);
export const selectReplyIdsCount = createSelector(
  selectReplyIdsState,
  selectTotal
);
export const selectReplyIdsEntities = createSelector(
  selectReplyIdsState,
  selectEntities
);

export const selectCommentItemsData = (postId: string) =>
  createSelector(
    selectReplyIdsEntities,
    selectPostEntities,
    selectContentEntities,
    selectProfileEntities,
    selectMyAccountAddress,
    selectMyPostReactionsEntities,
    (
      replyIdEntities,
      postEntities,
      contentEntities,
      profileEntities,
      address,
      myPostReactionsEntities
    ): CommentItemData[] => {
      const commentItemsData: CommentItemData[] = [];

      const replyIds = replyIdEntities[postId];

      if (replyIds) {
        replyIds.replyIds.map((replyPostId) => {
          const postStruct = postEntities[replyPostId];
          const postContent = contentEntities[
            postStruct?.contentId!
          ] as PostContent;
          const profileStruct = profileEntities[postStruct?.ownerId!];
          const profileContent = contentEntities[
            profileStruct?.contentId!
          ] as ProfileContent;
          if (postStruct && postContent) {
            const myPostReaction =
              myPostReactionsEntities[address + '-' + postStruct!.id];

            commentItemsData.push({
              postId: postStruct.id,
              ownerId: postStruct.ownerId,
              profileName: profileContent?.name,
              createdAtTime: postStruct.createdAtTime,
              avatar: profileContent?.avatar,
              commentText: postContent.body,
              upvoteCount: postStruct.upvotesCount,
              downvoteCount: postStruct.downvotesCount,
              replyCount: postStruct.repliesCount,
              upvoteActive: myPostReaction?.kind === 'Upvote',
              downvoteActive: myPostReaction?.kind === 'Downvote',
            });
          }
        });
      }

      return commentItemsData;
    }
  );
