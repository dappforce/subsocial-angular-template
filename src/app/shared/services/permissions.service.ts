import { Injectable } from '@angular/core';
import { PostFacade } from '../../store/post/post.facade';
import { map } from 'rxjs/operators';
import { SpaceFacade } from '../../store/space/space.facade';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private postFacade: PostFacade,
    private spaceFacade: SpaceFacade
  ) {}

  checkIfPostOwner(accountId: string, postId: string) {
    return this.postFacade
      .getPost(postId)
      .pipe(map((post) => post?.ownerId === accountId));
  }

  checkIfSpaceOwner(accountId: string, spaceId: string) {
    return this.spaceFacade
      .getSpace(spaceId)
      .pipe(map((space) => space?.ownerId === accountId));
  }
}
