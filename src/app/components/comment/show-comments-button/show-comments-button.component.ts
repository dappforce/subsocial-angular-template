import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-show-comments-button',
  templateUrl: './show-comments-button.component.html',
  styleUrls: ['./show-comments-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCommentsButtonComponent implements OnInit {
  @Input() isShowReplyComments: boolean | null;
  @Input() replyCommentCount: number | null;
  @Output() showMore = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
