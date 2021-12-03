import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners';

export interface SpaceState extends EntityState<SpaceStruct> {}

export const spaceAdapter: EntityAdapter<SpaceStruct> =
  createEntityAdapter<SpaceStruct>();

export const initialSpaceState: SpaceState = spaceAdapter.getInitialState();
