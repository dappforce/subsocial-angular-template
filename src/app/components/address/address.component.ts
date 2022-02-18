import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressComponent {
  @Input() address = '';
  @Input() iconMargin = '';
  @Input() showIcon = false;
  @Input() addressLength = 12;
  @Input() showCopyButton = false;
  @Input() size: 'small' | 'medium' = 'small';

  constructor(private snackBar: SnackBarService, private t: I18NextPipe) {}

  onCopy(event: any) {
    event.stopPropagation();
    this.snackBar.openSimpleSnackBar({
      message: this.t.transform('snackbars.addressCopied'),
      iconName: 'info-icon',
      duration: 1500,
    });
  }
}
