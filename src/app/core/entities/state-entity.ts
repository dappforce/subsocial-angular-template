import { Entity } from './entity.model';

export interface StateEntity<T> {
  ids: Array<string>;
  entities: Entity<T>;
}
