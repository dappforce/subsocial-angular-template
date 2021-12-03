import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Content } from '../../core/types/content.type';

export interface ContentState extends EntityState<Content> {}

export const contentAdapter: EntityAdapter<Content> =
  createEntityAdapter<Content>();

export const initialContentState: ContentState =
  contentAdapter.getInitialState();
