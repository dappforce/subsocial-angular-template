import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/state';
import { loadPostsByIds } from '../../state/post/post.actions';
import { selectPostsByIds } from '../../state/post/post.selectors';
import { Post } from '../../core/models/post/post-list-item.model';
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
  extends BaseInfinityScrollComponent<Post>
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
      this.getScrollableData(loadPostsByIds, selectPostsByIds);
    }
  }
}
