import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommentItemData } from '../../../core/types/comment-data.type';
import { PluralizePipe } from '../../../shared/pipes/pluralize.pipe';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnChanges {
  @Input() commentListData: CommentItemData[] | null = [];

  commentsCount: string = '';

  constructor(private pluralize: PluralizePipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.commentListData) {
      this.commentsCount = `${
        this.commentListData?.length || '0'
      } ${this.pluralize.transform(
        this.commentListData?.length || 0,
        'Comment'
      )}`;
    }
  }
}
