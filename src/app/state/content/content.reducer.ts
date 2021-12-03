import { Action, createReducer, on } from '@ngrx/store';
import { upsertContent, upsertContents } from './content.actions';
import {
  contentAdapter,
  ContentState,
  initialContentState,
} from './content.state';

const reducer = createReducer(
  initialContentState,
  on(upsertContents, (state, { payload }) =>
    payload ? contentAdapter.upsertMany(payload, state) : state
  ),
  on(upsertContent, (state, { payload }) =>
    payload ? contentAdapter.upsertOne(payload, state) : state
  )
);

export function contentReducer(
  state: ContentState | undefined,
  action: Action
) {
  return reducer(state, action);
}
