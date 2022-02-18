import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AccountData } from '../../../core/types/account.types';

@Component({
  selector: 'app-account-list-item',
  templateUrl: './account-list-item.component.html',
  styleUrls: ['./account-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListItemComponent {
  @Input() accountData: AccountData;
  @Output() onClick = new EventEmitter();
  showCopyButton = false;
  avatarBaseUrl = environment.ipfsUrl;

  @HostListener('mouseover') onMouseHover() {
    this.showCopyButton = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.showCopyButton = false;
  }

  constructor(public dialogRef: MatDialog) {}
}
