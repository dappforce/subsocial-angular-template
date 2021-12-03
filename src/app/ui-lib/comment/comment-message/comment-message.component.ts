import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommentItemData } from '../../../core/types/comment-data.type';
import { DeviceService } from '../../../shared/services/device.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReactionModalData } from '../../../core/types/dialog-modal-data.types';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { VoteModalDialogComponent } from '../../../shared/modal-dialogs/vote-modal-dialog/vote-modal-dialog.component';

@Component({
  selector: 'app-comment-message',
  templateUrl: './comment-message.component.html',
  styleUrls: ['./comment-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentMessageComponent implements OnInit, OnDestroy {
  @Input() commentData: CommentItemData;
  showReplyInput: boolean;
  reactionModalData: ReactionModalData;

  private modalConfig: MatDialogConfig = {};
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public device: DeviceService,
    public dialog: MatDialog,
    public deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.prepareModalConfig();
  }

  onReplyClick() {
    this.showReplyInput = !this.showReplyInput;
  }

  onOpenReactions() {
    this.dialog.open(VoteModalDialogComponent, this.modalConfig);
  }

  ngOnDestroy(): void {
    //check for storybook
    if (typeof this.unsubscribe$ !== 'string') {
      this.unsubscribe$?.next();
      this.unsubscribe$?.complete();
    }
  }

  private prepareModalConfig() {
    this.reactionModalData = {
      postId: this.commentData.postId || '',
      upvotesCount: this.commentData.upvoteCount || 0,
      downvotesCount: this.commentData.downvoteCount || 0,
    };

    this.modalConfig.data = this.reactionModalData;

    this.deviceService?.isMobile$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isMobile) => {
        if (isMobile) {
          this.modalConfig.width = '95%';
          this.modalConfig.maxWidth = 'none';
        } else {
          this.modalConfig.width = '500px';
          this.modalConfig.maxWidth = '80vh';
        }
      });
  }
}
