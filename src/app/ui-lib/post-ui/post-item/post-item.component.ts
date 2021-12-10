import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PostListItemData } from '../../../core/models/post/post-list-item.model';
import { OnViewReaction } from '../../../core/interfaces/on-view-reaction';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VoteModalDialogComponent } from '../../../shared/modal-dialogs/vote-modal-dialog/vote-modal-dialog.component';
import { DeviceService } from '../../../shared/services/device.service';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';
import { getReplyIdsByParentPostId } from '../../../state/reply-id/reply-id.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { CommentItemData } from '../../../core/types/comment-data.type';
import { selectCommentItemsData } from '../../../state/reply-id/reply-id.selectors';
import { ReactionModalData } from '../../../core/types/dialog-modal-data.types';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostItemComponent implements OnInit, OnDestroy, OnViewReaction {
  @Input() postItemData: PostListItemData | null;
  @Input() showActionPanel = true;

  commentData$: Observable<CommentItemData[]>;
  isCommentOpen: boolean;

  isHiddenPost: boolean;

  private unsubscribe$: Subject<void> = new Subject();
  private modalConfig: MatDialogConfig = {};

  constructor(
    public dialog: MatDialog,
    public deviceService: DeviceService,
    private store: Store<AppState>
  ) {}

  onViewReaction(): void {
    this.dialog.open(VoteModalDialogComponent, this.modalConfig);
  }

  ngOnInit(): void {
    this.prepareModalConfig();

    this.commentData$ = this.store
      .select(selectCommentItemsData(this.postItemData?.id!))
      .pipe(
        tap((a) => console.log(a)),
        filter((commentData) => commentData.length > 0),
        take(1)
      );

    this.isHiddenPost =
      (this.postItemData?.hidden && !this.postItemData?.isMyPost) || false;
  }

  onCommentButtonClick() {
    if (!this.isCommentOpen) {
      this.store.dispatch(
        getReplyIdsByParentPostId({ id: this.postItemData?.id! })
      );
    }

    this.isCommentOpen = !this.isCommentOpen;
  }

  private prepareModalConfig() {
    const data = {
      postId: this.postItemData?.id || '',
      upvotesCount: this.postItemData?.upvotesCount || 0,
      downvotesCount: this.postItemData?.downvotesCount || 0,
    };

    this.deviceService
      ?.getResponsiveModalData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (responsiveData) => (this.modalConfig = { ...responsiveData, data })
      );
  }

  ngOnDestroy(): void {
    //check for storybook
    if (typeof this.unsubscribe$ !== 'string') {
      this.unsubscribe$?.next();
      this.unsubscribe$?.complete();
    }
  }
}
