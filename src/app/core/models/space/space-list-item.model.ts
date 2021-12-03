import { SpaceContent } from '@subsocial/api/flat-subsocial/dto';
import { HasId, SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { EntityListData } from '../../types/entity-data.type';

export type SpaceListItemData = EntityListData<
  SpaceStruct,
  SpaceContentExtend
> &
  HasId;

export type SpaceContentExtend = SpaceContent & HasHandle;

export type HasHandle = {
  handle: string;
};
