import { createFeatureSelector, createSelector } from '@ngrx/store';
import { replyIdAdapter, ReplyIdState } from './reply-id.state';
import { selectPostEntities } from '../post/post.selectors';
import { Post } from '../../core/models/post/post-list-item.model';

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

export const selectReplyIdsByPostId = (id: string) =>
  createSelector(selectReplyIdsEntities, (replyEntities) => replyEntities[id]);

export const selectCommentPostsByPostId = (id: string) =>
  createSelector(
    selectReplyIdsEntities,
    selectPostEntities,
    (replyIds, postEntities) => {
      const postIds = replyIds[id];
      const posts: Post[] = [];

      postIds?.replyIds.forEach((id) => {
        const post = postEntities[id];

        post ? posts.push(post) : null;
      });

      return posts;
    }
  );
