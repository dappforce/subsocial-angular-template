import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export type MyPostReactions = {
  id: string;
  reactionId?: string;
  kind?: 'Upvote' | 'Downvote';
};

export interface MyPostReactionsState extends EntityState<MyPostReactions> {}

export const myPostReactionsAdapter: EntityAdapter<MyPostReactions> =
  createEntityAdapter<MyPostReactions>();

export const initialMyPostReactionsState: MyPostReactionsState =
  myPostReactionsAdapter.getInitialState();
