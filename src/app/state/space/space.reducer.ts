import { Action, createReducer, on } from '@ngrx/store';
import * as SpaceActions from './space.actions';
import { spaceAdapter, initialSpaceState, SpaceState } from './space.state';

const spaceReducers = createReducer(
  initialSpaceState,
  on(SpaceActions.loadSpacesByIds, (state) => state),

  on(SpaceActions.upsertSpaces, (state, { payload }) => {
    return payload ? spaceAdapter.upsertMany(payload, state) : state;
  }),

  on(SpaceActions.upsertSpace, (state, { payload }) => {
    return payload ? spaceAdapter.upsertOne(payload, state) : state;
  }),
  on(SpaceActions.updateSpace, (state, { payload }) => {
    return spaceAdapter.updateOne(payload, state);
  }),
  on(SpaceActions.loadSpaceById, (state) => state)
);

export function spaceReducer(state: SpaceState | undefined, action: Action) {
  return spaceReducers(state, action);
}
