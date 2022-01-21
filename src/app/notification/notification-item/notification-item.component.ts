import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NotificationItem } from '../notification-page/notification-page.component';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationItemComponent implements OnInit {
  @Input() notification: NotificationItem;

  constructor() {}

  async ngOnInit() {}
}
