import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent {
  @Input() isFollow = false;
  @Input() width: 'full' | 'static' = 'static';
  @Input() size: 'medium' | 'large' = 'medium';

  @Output() onUnfollow = new EventEmitter<Event>();
  @Output() onFollow = new EventEmitter<Event>();

  constructor() {}
}
