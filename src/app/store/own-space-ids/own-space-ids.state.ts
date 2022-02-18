import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
export type OwnSpaceIdsStruct = {
  id: string;
  ownSpaceIds: Array<string>;
};

export interface OwnSpaceIdsState extends EntityState<OwnSpaceIdsStruct> {}

export const ownSpaceIdsAdapter: EntityAdapter<OwnSpaceIdsStruct> =
  createEntityAdapter<OwnSpaceIdsStruct>();

export const initialOwnSpaceIdsState: OwnSpaceIdsState =
  ownSpaceIdsAdapter.getInitialState();
