import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export type MyPostReactionsStruct = {
  id: string;
  reactionId?: string;
  kind?: 'Upvote' | 'Downvote';
};

export interface MyPostReactionsState
  extends EntityState<MyPostReactionsStruct> {}

export const myPostReactionsAdapter: EntityAdapter<MyPostReactionsStruct> =
  createEntityAdapter<MyPostReactionsStruct>();

export const initialMyPostReactionsState: MyPostReactionsState =
  myPostReactionsAdapter.getInitialState();
