import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export type Space = {
  id: string;
  ownerId: string;
  isHidden: boolean;
  name: string;
  image: string;
  followersCount: number;
  postsCount: number;
  spaceLink: string;
  summary: string;
  about: string;
  isShowMore: boolean;
  tags: string[];
  links: string[];
};

export interface SpaceState extends EntityState<Space> {}

export const spaceAdapter: EntityAdapter<Space> = createEntityAdapter<Space>();

export const initialSpaceState: SpaceState = spaceAdapter.getInitialState();
