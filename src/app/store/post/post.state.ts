import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../../core/models/post/post-list-item.model';

export interface PostState extends EntityState<Post> {}

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialPostState: PostState = postAdapter.getInitialState();
