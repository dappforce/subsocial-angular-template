import {
  AnyId,
  AnySubsocialData,
  EntityId,
  PostData,
  ProfileData,
  SpaceData,
} from '@subsocial/api/flat-subsocial/dto';
import { Entity } from '../entities/entity.model';
import { StateEntity } from '../entities/state-entity';
import { Content } from '../types/content.type';
import {
  PostStruct,
  SpaceStruct,
} from '@subsocial/api/flat-subsocial/flatteners';
import { TransformDataArray } from '../types/transform-dto.types';
import { PostListItemData } from '../models/post/post-list-item.model';
import {
  SpaceContentExtend,
  SpaceListItemData,
} from '../models/space/space-list-item.model';
import { Dictionary } from '@ngrx/entity';
import slug from 'slugify';
import BN from 'bn.js';

export const getStateEntityFromArray = <T>(
  array: Array<AnySubsocialData>,
  type: 'struct' | 'content' = 'struct'
): StateEntity<T> => {
  const ids: string[] = [];
  const entities: Entity<any> = {};
  array.map((elem) => {
    const id: string | undefined =
      type === 'struct' ? elem.struct.id.toString() : elem.struct.contentId;
    if (id) {
      ids.push(id);
      entities[id] = elem[type];
    }
  });
  return { ids, entities };
};

export const transformEntityDataArray = (
  array: Array<SpaceData> | Array<PostData> | Array<ProfileData>
): TransformDataArray => {
  const structs: any[] = [];
  const contents: Content[] = [];
  array.map((data) => {
    if (data.content && data.struct.contentId) {
      structs.push(data.struct);
      contents.push({ id: data.struct.contentId, ...data.content });
    }
  });

  return { structs, contents };
};

export const sliceEntityArray = (
  entityArray: Array<any>,
  contentEntities: any,
  start: number,
  end: number
) => {
  const entityData: any[] = [];

  entityArray.slice(start, end).map((struct) => {
    if (struct.contentId) {
      const content = contentEntities[struct.contentId];
      content ? entityData.push({ struct, content }) : null;
    }
  });

  return entityData;
};

export const getPostLink = (
  spaceHandle: string | undefined,
  title: string,
  id: string,
  spaceId: string
): string => {
  return `/${spaceHandle ? '@' + spaceHandle : spaceId}/${slug(title)}-${id}`;
};
