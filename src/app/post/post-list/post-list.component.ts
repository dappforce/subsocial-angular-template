import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/state';
import {
  getPostsByIds,
  loadPostsSuccess,
  upsertPosts,
} from '../../state/post/post.actions';
import { selectPostsWithAllDetailsByIds } from '../../state/post/post.selectors';
import { PostListItemData } from '../../core/models/post/post-list-item.model';
import { isPlatformBrowser } from '@angular/common';
import { BaseInfinityScrollComponent } from '../../core/base-component/base-infinity-scroll.component';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent
  extends BaseInfinityScrollComponent<PostListItemData>
  implements OnInit
{
  constructor(
    public store: Store<AppState>,
    public cd: ChangeDetectorRef,
    public action$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super(store, cd, action$);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getScrollableData(
        getPostsByIds,
        selectPostsWithAllDetailsByIds,
        loadPostsSuccess
      );
    }
  }
}
