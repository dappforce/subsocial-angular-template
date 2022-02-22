import { postAdapter, PostState } from './post.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post } from '../../core/models/post/post-list-item.model';
import { difference } from 'lodash';
import { dictionaryToArray, selectEntitiesByIds } from '../../core/utils';

const { selectIds, selectEntities, selectAll, selectTotal } =
  postAdapter.getSelectors();

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectPostIds = createSelector(selectPostState, selectIds);
export const selectAllPosts = createSelector(selectPostState, selectAll);
export const selectPostsCount = createSelector(selectPostState, selectTotal);
export const selectPostEntities = createSelector(
  selectPostState,
  selectEntities
);

export const selectPostById = (id: string) =>
  createSelector(selectPostEntities, (postEntities) => postEntities[id]);

export const selectPostsByIds = (ids: string[]) =>
  createSelector(selectPostEntities, (postEntities) =>
    dictionaryToArray<Post>(postEntities, ids)
  );

export const selectPostsWithAllDetailsByIds = (ids: string[]) =>
  createSelector(selectPostEntities, (postEntities) =>
    selectEntitiesByIds<Post>(postEntities, ids)
  );

export const selectNonExistingPostIds = (newIds: string[]) =>
  createSelector(selectPostIds, (postIds) => {
    return difference(newIds, postIds as string[]);
  });
