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
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { CommentService } from '../../../shared/services/comment.service';
import { PostService } from '../../../post/services/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SharePostModalDialogComponent } from '../../modal-dialogs/share-post-modal-dialog/share-post-modal-dialog.component';
import { AccountService } from '../../../shared/services/account.service';
import { VisibilityService } from '../../../shared/services/visibility.service';

@Component({
  selector: 'app-shared-post-item',
  templateUrl: './shared-post-item.component.html',
  styleUrls: ['./shared-post-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedPostItemComponent implements OnInit, OnChanges {
  @Input() postItemData: Post;
  @Input() showHiddenContent: boolean | null;
  sharedPostItemData: Post | undefined;
  isCommentOpen: boolean;
  repliesCount: number;
  isSharedPostHidden: boolean;
  skip$: Observable<boolean>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<AppState>,
    private commentService: CommentService,
    private postService: PostService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private account: AccountService,
    private visibility: VisibilityService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.postItemData && changes.postItemData.currentValue) {
      this.repliesCount = this.postItemData!.repliesCount;
    }
  }

  async ngOnInit() {
    this.skip$ = this.account.currentAccount$.pipe(
      mergeMap((account) =>
        this.visibility
          .getIsPostHidden(this.postItemData!.id)
          .pipe(
            map(
              (hidden) =>
                (hidden && !account) || (hidden && !this.showHiddenContent)
            )
          )
      )
    );

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

  onSharedClick() {
    if (this.sharedPostItemData) {
      const config: MatDialogConfig = {
        data: this.sharedPostItemData,
        width: '780px',
        panelClass: 'modal-overflow',
      };

      this.dialog.open(SharePostModalDialogComponent, config);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.next();
    this.unsubscribe$?.complete();
  }
}
