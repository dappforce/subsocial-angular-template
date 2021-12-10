import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommentItemData } from '../../../core/types/comment-data.type';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  @Input() commentListData: CommentItemData[] | null = [];
  @Input() commentsCount: number = 0;

  constructor() {}
}
