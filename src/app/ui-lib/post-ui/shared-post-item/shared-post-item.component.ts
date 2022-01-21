import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Post } from '../../../core/models/post/post-list-item.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { filter, takeUntil } from 'rxjs/operators';
import { CommentService } from '../../../shared/services/comment.service';
import { PostService } from '../../../post/services/post.service';

@Component({
  selector: 'app-shared-post-item',
  templateUrl: './shared-post-item.component.html',
  styleUrls: ['./shared-post-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedPostItemComponent implements OnInit, OnChanges {
  @Input() postItemData: Post;
  sharedPostItemData: Post | undefined;
  isHidden: boolean;
  isCommentOpen: boolean;
  repliesCount: number;
  isSharedPostHidden: boolean;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<AppState>,
    private commentService: CommentService,
    private postService: PostService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.postItemData && changes.postItemData.currentValue) {
      this.repliesCount = this.postItemData!.repliesCount;
    }
  }

  async ngOnInit() {
    this.isHidden = this.postItemData.hidden;

    const sharedPostId = this.postItemData.sharedPostId;

    if (sharedPostId) {
      this.sharedPostItemData = await this.postService.loadPostById(
        sharedPostId
      );

      this.isSharedPostHidden =
        !this.sharedPostItemData || this.sharedPostItemData.spaceHidden;

      this.cd.markForCheck();
    }
  }

  onViewReaction() {}

  onCommentButtonClick() {
    this.isCommentOpen = !this.isCommentOpen;
  }

  onSwitchHidden() {
    this.isHidden = !this.isHidden;
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.next();
    this.unsubscribe$?.complete();
  }
}
