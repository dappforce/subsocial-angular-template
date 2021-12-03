import { postAdapter, PostState } from './post.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectContentEntities } from '../content/content.selectors';
import { selectProfileEntities } from '../profile/profile.selectors';
import { selectSpaceEntities } from '../space/space.selectors';
import { PostListItemData } from '../../core/models/post/post-list-item.model';
import { PostContent, ProfileContent } from '@subsocial/api/flat-subsocial/dto';
import {
  CommentStruct,
  PostStruct,
  SharedPostStruct,
} from '@subsocial/api/flat-subsocial/flatteners';
import { KeyValuePair } from '../../core/models/key-value-pair.model';
import { mapPostDataToPostListItem } from '../../core/mapper/post.map';
import * as _ from 'lodash';
import { SpaceContentExtend } from '../../core/models/space/space-list-item.model';
import {
  selectMyAccount,
  selectMyAccountAddress,
} from '../my-account/my-account.selectors';
import { selectMyPostReactionsEntities } from '../my-post-reactions/my-post-reactions.selectors';

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

export const selectPostStructByIds = (ids: string[]) =>
  createSelector(selectPostEntities, (postEntities) => {
    const structs: PostStruct[] = [];
    ids.forEach((id) => {
      const struct = postEntities[id];
      struct ? structs.push(struct) : null;
    });

    return structs;
  });

export const selectPostsWithAllDetailsByIds = (ids: string[]) =>
  createSelector(
    selectPostStructByIds(ids),
    selectContentEntities,
    selectProfileEntities,
    selectSpaceEntities,
    selectMyAccountAddress,
    selectMyPostReactionsEntities,
    (
      postArray,
      contentEntities,
      profileEntity,
      spaceEntity,
      address,
      myPostReactionEntities
    ) => {
      const postListItemDataArray: KeyValuePair<PostListItemData> = {};

      postArray.forEach((postStruct) => {
        const profile = profileEntity[postStruct.ownerId];

        const myPostReaction =
          myPostReactionEntities[address + '-' + postStruct.id];

        if (postStruct.contentId) {
          const spaceStruct = postStruct.spaceId
            ? spaceEntity[postStruct.spaceId]
            : undefined;
          const postContent = contentEntities[
            postStruct.contentId
          ] as PostContent;
          const profileContent = profile?.contentId
            ? (contentEntities[profile.contentId] as ProfileContent)
            : undefined;

          const spaceContent = contentEntities[
            spaceStruct?.contentId!
          ] as SpaceContentExtend;

          if (postContent) {
            const postListItemData: PostListItemData =
              mapPostDataToPostListItem(
                postStruct as SharedPostStruct & CommentStruct,
                postContent,
                spaceStruct,
                profileContent,
                spaceContent,
                address,
                myPostReaction
              );

            postListItemDataArray[postStruct.id] = postListItemData;
          }
        }
      });

      return postListItemDataArray;
    }
  );

export const selectPostWithAllDetailsById = (id: string) =>
  createSelector(selectPostsWithAllDetailsByIds([id]), (postsData) => {
    return postsData[id];
  });

export const selectNonExistingPostIds = (newIds: string[]) =>
  createSelector(selectPostIds, (postIds) => {
    return _.difference(newIds, postIds as string[]);
  });
