import slug from 'slugify';
import { Dictionary } from "@ngrx/entity";

export const dictionaryToArray = <T>(entities: Dictionary<T>, ids: string[]) => {
  const array: T[] = [];

  ids.forEach(id => {
    if(entities.hasOwnProperty(id)) {
      array.push(entities[id]!)
    }
  })

  return array;
}

export const selectEntitiesByIds = <T>(entities: Dictionary<T>, ids: string[]) => {
  const selectedEntities: Dictionary<T> = {};
  ids.forEach((id) => {
    const post = entities[id];
    if(entities.hasOwnProperty(id)) {
      selectedEntities[id] = post;
    }
  });

  return selectedEntities;
}

export const getPostLink = (
  spaceHandle: string | undefined,
  title: string,
  id: string,
  spaceId: string
): string => {
  return `/${spaceHandle ? '@' + spaceHandle : spaceId}/${slug(title)}-${id}`;
};
