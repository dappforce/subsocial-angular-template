import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-downvote-button',
  templateUrl: './downvote-button.component.html',
  styleUrls: ['./downvote-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownvoteButtonComponent {
  @Input() isShowLabel: boolean = false;
  @Input() isActive: boolean = false;
  @Input() count: number = 0;

  setIsActive(value: boolean) {
    this.isActive = value;
    this.count = value ? ++this.count : --this.count;
  }
}
