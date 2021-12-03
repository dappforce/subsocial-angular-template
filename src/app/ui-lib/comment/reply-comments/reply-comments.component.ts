import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { selectCommentItemsData } from '../../../state/reply-id/reply-id.selectors';
import { Observable } from 'rxjs';
import { CommentItemData } from '../../../core/types/comment-data.type';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { getReplyIdsByParentPostId } from '../../../state/reply-id/reply-id.actions';
import { filter, first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-reply-comments',
  templateUrl: './reply-comments.component.html',
  styleUrls: ['./reply-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplyCommentsComponent implements OnInit {
  @Input() replyCommentCount: number;
  @Input() rootPostId: string;

  isShowReplyComments = false;

  commentData$: Observable<CommentItemData[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.commentData$ = this.store
      .select(selectCommentItemsData(this.rootPostId))
      .pipe(
        filter((commentData) => commentData.length > 0),
        first()
      );
  }

  expandMoreReplies() {
    this.isShowReplyComments = !this.isShowReplyComments;
    if (this.isShowReplyComments) {
      this.store.dispatch(getReplyIdsByParentPostId({ id: this.rootPostId }));
    }
  }
}
