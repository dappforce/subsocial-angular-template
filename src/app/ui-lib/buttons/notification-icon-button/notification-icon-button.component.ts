import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationService } from '../../../notification/services/notification.service';
import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'app-notification-icon-button',
  templateUrl: './notification-icon-button.component.html',
  styleUrls: ['./notification-icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationIconButtonComponent {
  notificationCount$ = this.notificationService.notificationCount$;
  currentAccount$ = this.account.currentAccount$;

  constructor(
    public notificationService: NotificationService,
    public account: AccountService
  ) {}
}
