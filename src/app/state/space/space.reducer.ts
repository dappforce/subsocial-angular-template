import { Action, createReducer, on } from '@ngrx/store';
import * as SpaceActions from './space.actions';
import { spaceAdapter, initialSpaceState, SpaceState } from './space.state';

const spaceReducers = createReducer(
  initialSpaceState,
  on(SpaceActions.getSpacesByIds, (state) => state),
  on(SpaceActions.upsertSpaces, (state, { payload }) => {
    return spaceAdapter.upsertMany(payload, state);
  }),
  on(SpaceActions.upsertSpace, (state, { payload }) => {
    return spaceAdapter.upsertOne(payload, state);
  }),
  on(SpaceActions.loadSpaceById, (state) => state)
);

export function spaceReducer(state: SpaceState | undefined, action: Action) {
  return spaceReducers(state, action);
}
