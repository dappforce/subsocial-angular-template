import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-upvote-button',
  templateUrl: './upvote-button.component.html',
  styleUrls: ['./upvote-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpvoteButtonComponent {
  @Input() isShowLabel: boolean = false;
  @Input() isActive: boolean = false;
  @Input() count: number = 0;

  setIsActive(value: boolean) {
    this.isActive = value;
    this.count = value ? ++this.count : --this.count;
  }
}
