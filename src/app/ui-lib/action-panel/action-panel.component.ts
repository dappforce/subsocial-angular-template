import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionPanelComponent implements OnInit {
  @Input() isShowShare = false;
  @Input() isShowComment = false;
  @Input() upvoteCount: number = 0;
  @Input() downvoteCount: number = 0;
  @Input() commentCount: number = 0;
  @Input() isUpvoteActive: boolean | undefined = false;
  @Input() isDownvoteActive: boolean | undefined = false;
  @Input() isShowLabel = false;
  @Input() isShowReply = false;
  @Input() position: 'center' | 'left' = 'center';
  @Output() replyClick = new EventEmitter();
  @Output() commentClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
