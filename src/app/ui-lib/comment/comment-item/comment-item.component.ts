import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DeviceService } from '../../../shared/services/device.service';
import { Post } from '../../../core/models/post/post-list-item.model';
import { PostFacade } from '../../../state/post/post.facade';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentItemComponent implements OnInit {
  @Input() rootPostId: string;
  @Input() isFirstLevel: boolean;
  @Input() comment: Post;

  isShowReplyInput: boolean;
  isEdit: boolean;
  showCommentText: boolean = true;
  hidden: boolean;

  constructor(
    public device: DeviceService,
    private cd: ChangeDetectorRef,
    private postFacade: PostFacade
  ) {}

  ngOnInit(): void {
    this.hidden = this.comment.hidden;
  }

  onOpenReactions() {}

  onEdit() {
    this.isEdit = !this.isEdit;
  }

  onEditCommentSuccess() {
    this.isEdit = false;
    this.cd.markForCheck();
  }

  onSwitchHidden() {
    this.hidden = !this.hidden;
    this.postFacade.loadPost(this.comment.id);
  }
}
