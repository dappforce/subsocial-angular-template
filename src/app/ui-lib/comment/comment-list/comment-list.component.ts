import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommentService } from '../../../shared/services/comment.service';
import { Post } from '../../../core/models/post/post-list-item.model';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { PostFacade } from '../../../state/post/post.facade';
import { ReplyFacade } from '../../../state/reply-id/reply.facade';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit {
  @Input() rootPostId: string;
  @Input() parentPostId: string | undefined;
  @Input() isShowInput: boolean;
  @Input() isFirstLevel: boolean;
  @Output() closeReply = new EventEmitter();

  comments$: Observable<Post[]>;
  parentPost$: Observable<Post | undefined>;
  commentsCount$: Observable<number>;
  isChildrenShow$: Observable<boolean>;
  parentId: string;

  constructor(
    private commentService: CommentService,
    private postFacade: PostFacade,
    private replyFacade: ReplyFacade
  ) {}

  async ngOnInit() {
    this.parentId = this.isFirstLevel ? this.rootPostId : this.parentPostId!;

    this.comments$ = this.replyFacade.getReplyPostByRootPostId(this.parentId);

    this.parentPost$ = this.postFacade.getPost(this.parentId);

    this.commentsCount$ = this.parentPost$.pipe(
      map((post) => post?.repliesCount || 0)
    );

    this.isChildrenShow$ = this.parentPost$.pipe(
      pluck('isChildrenCommentShow')
    );

    if (this.isFirstLevel) {
      this.postFacade.switchIsChildrenCommentShow(this.parentId, true);
    }
  }

  onShowMore() {
    this.postFacade.switchIsChildrenCommentShow(this.parentId);
  }
}
