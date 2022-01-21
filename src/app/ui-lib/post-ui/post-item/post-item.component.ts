import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Post } from '../../../core/models/post/post-list-item.model';
import { OnViewReaction } from '../../../core/interfaces/on-view-reaction';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VoteModalDialogComponent } from '../../modal-dialogs/vote-modal-dialog/vote-modal-dialog.component';
import { DeviceService } from '../../../shared/services/device.service';
import { Observable, Subject } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { SharePostModalDialogComponent } from '../../modal-dialogs/share-post-modal-dialog/share-post-modal-dialog.component';
import { AccountService } from '../../../shared/services/account.service';
import { VisibilityService } from '../../../shared/services/visibility.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostItemComponent implements OnInit, OnDestroy, OnViewReaction {
  @Input() postItemData: Post | null;
  @Input() isSharedPost = false;
  @Input() showHiddenContent: boolean | null;

  isCommentOpen: boolean;

  skip$: Observable<boolean>;

  private unsubscribe$: Subject<void> = new Subject();
  private modalConfig: MatDialogConfig = {};

  constructor(
    public dialog: MatDialog,
    public deviceService: DeviceService,
    private account: AccountService,
    private visibility: VisibilityService
  ) {}

  ngOnInit(): void {
    this.prepareModalConfig();

    this.skip$ = this.account.currentAccount$.pipe(
      mergeMap((_) =>
        this.visibility
          .getIsPostHidden(this.postItemData!.id)
          .pipe(map((hidden) => hidden && !this.showHiddenContent))
      )
    );
  }

  async onCommentButtonClick() {
    this.isCommentOpen = !this.isCommentOpen;
  }

  onShareClick() {
    const config: MatDialogConfig = {
      data: this.postItemData,
      width: '780px',
      panelClass: 'modal-overflow',
    };

    this.dialog.open(SharePostModalDialogComponent, config);
  }

  private prepareModalConfig() {
    this.deviceService
      .getResponsiveModalData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (responsiveData) => (this.modalConfig = { ...responsiveData })
      );
  }

  onViewReaction(): void {
    const data = {
      postId: this.postItemData?.id || '',
      upvotesCount: this.postItemData?.upvotesCount || 0,
      downvotesCount: this.postItemData?.downvotesCount || 0,
    };

    this.modalConfig.data = data;

    this.dialog.open(VoteModalDialogComponent, this.modalConfig);
  }

  ngOnDestroy(): void {
    //check for storybook
    if (typeof this.unsubscribe$ !== 'string') {
      this.unsubscribe$?.next();
      this.unsubscribe$?.complete();
    }
  }
}
