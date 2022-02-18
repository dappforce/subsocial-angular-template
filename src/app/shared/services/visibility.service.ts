import { Injectable } from '@angular/core';
import { PostFacade } from '../../store/post/post.facade';
import { SpaceFacade } from '../../store/space/space.facade';
import { filter, map } from 'rxjs/operators';
import { PermissionsService } from './permissions.service';

@Injectable({
  providedIn: 'root',
})
export class VisibilityService {
  constructor(
    private postFacade: PostFacade,
    private spaceFacade: SpaceFacade,
    private permission: PermissionsService
  ) {}

  switchPostVisibility(postId: string) {
    this.postFacade.switchVisibility(postId);
  }

  switchSpaceVisibility(spaceId: string) {
    this.spaceFacade.switchVisibility(spaceId);
  }

  getIsPostHidden(postId: string) {
    return this.postFacade.getPost(postId).pipe(
      filter((post) => !!post),
      map((post) => post!.hidden || post!.spaceHidden)
    );
  }

  getIsSpaceHiddenByPostId(postId: string) {
    return this.postFacade.getPost(postId).pipe(
      filter((post) => !!post),
      map((post) => post!.spaceHidden)
    );
  }

  getIsSpaceHidden(spaceId: string) {
    return this.spaceFacade.getSpace(spaceId).pipe(
      filter((space) => !!space),
      map((space) => space!.isHidden)
    );
  }
}
