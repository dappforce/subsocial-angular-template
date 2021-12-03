import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PostListItemData } from '../../../core/models/post/post-list-item.model';
import { Observable } from 'rxjs';
import { getPostsByIds } from '../../../state/post/post.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { selectPostWithAllDetailsById } from '../../../state/post/post.selectors';

@Component({
  selector: 'app-shared-post-item',
  templateUrl: './shared-post-item.component.html',
  styleUrls: ['./shared-post-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedPostItemComponent implements OnInit {
  @Input() postItemData: PostListItemData;
  sharedPostItemData$: Observable<PostListItemData>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const sharedPostId = this.postItemData.sharedPostId;

    if (sharedPostId) {
      this.store.dispatch(getPostsByIds({ payload: { ids: [sharedPostId] } }));
      this.sharedPostItemData$ = this.store.select(
        selectPostWithAllDetailsById(sharedPostId)
      );
    }
  }

  onViewReaction() {}

  onCommentButtonClick() {}
}
