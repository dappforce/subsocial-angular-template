import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { TranslocoService } from '@ngneat/transloco';

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

  constructor(
    private snackBar: SnackBarService,
    private transloco: TranslocoService
  ) {}

  onCopy(event: any) {
    event.stopPropagation();
    this.snackBar.openSimpleSnackBar({
      message: this.transloco.translate('snackbars.addressCopied'),
      iconName: 'info-icon',
      duration: 1500,
    });
  }
}
