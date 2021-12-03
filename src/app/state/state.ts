import { ActionReducerMap } from '@ngrx/store';
import { spaceReducer } from './space/space.reducer';
import { contentReducer } from './content/content.reducer';
import { SpaceState } from './space/space.state';
import { ContentState } from './content/content.state';
import { postReducer } from './post/post.reducer';
import { PostState } from './post/post.state';
import { profileReducer } from './profile/profile.reducer';
import { ProfileState } from './profile/profile.state';
import { ReplyIdState } from './reply-id/reply-id.state';
import { replyIdReducer } from './reply-id/reply-id.reducer';
import { LoaderState } from './loader/loader.state';
import { loaderReducer } from './loader/loader.reducer';
import { MyAccountState } from './my-account/my-account.state';
import { myAccountReducer } from './my-account/my-account.reducer';
import { MyPostReactionsState } from './my-post-reactions/my-post-reactions.state';
import { myPostReactionsReducer } from './my-post-reactions/my-post-reactions.reducer';

export interface AppState {
  spaces: SpaceState;
  contents: ContentState;
  posts: PostState;
  profiles: ProfileState;
  replyIds: ReplyIdState;
  loader: LoaderState;
  myAccount: MyAccountState;
  myPostReactions: MyPostReactionsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  spaces: spaceReducer,
  contents: contentReducer,
  posts: postReducer,
  profiles: profileReducer,
  replyIds: replyIdReducer,
  loader: loaderReducer,
  myAccount: myAccountReducer,
  myPostReactions: myPostReactionsReducer,
};
