import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoteButtonComponent {
  @Input() isShowLabel: boolean = false;
  @Input() isActive: boolean = false;
  @Input() count: number = 0;
  @Output() voteClick = new EventEmitter();
}
