import { ActionReducerMap } from '@ngrx/store';
import { spaceReducer } from './space/space.reducer';
import { SpaceState } from './space/space.state';
import { postReducer } from './post/post.reducer';
import { PostState } from './post/post.state';
import { profileReducer } from './profile/profile.reducer';
import { ProfileState } from './profile/profile.state';
import { ReplyIdState } from './reply-id/reply-id.state';
import { replyIdReducer } from './reply-id/reply-id.reducer';
import { LoaderState } from './notification/loader.state';
import { loaderReducer } from './notification/loader.reducer';
import { MyAccountState } from './my-account/my-account.state';
import { myAccountReducer } from './my-account/my-account.reducer';
import { MyPostReactionsState } from './my-post-reactions/my-post-reactions.state';
import { myPostReactionsReducer } from './my-post-reactions/my-post-reactions.reducer';
import { FollowedSpaceIdsState } from './followed-space-ids/followed-space-ids.state';
import { followedSpaceIdsReducer } from './followed-space-ids/followed-space-ids.reducer';
import { FollowedAccountIdsState } from './followed-account-ids/followed-account-ids.state';
import { followedAccountIdsReducer } from './followed-account-ids/followed-account-ids.reducer';

export interface AppState {
  spaces: SpaceState;
  posts: PostState;
  profiles: ProfileState;
  replyIds: ReplyIdState;
  loader: LoaderState;
  myAccount: MyAccountState;
  myPostReactions: MyPostReactionsState;
  followedSpaceIds: FollowedSpaceIdsState;
  followedAccountIds: FollowedAccountIdsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  spaces: spaceReducer,
  posts: postReducer,
  profiles: profileReducer,
  replyIds: replyIdReducer,
  loader: loaderReducer,
  myAccount: myAccountReducer,
  myPostReactions: myPostReactionsReducer,
  followedSpaceIds: followedSpaceIdsReducer,
  followedAccountIds: followedAccountIdsReducer,
};
