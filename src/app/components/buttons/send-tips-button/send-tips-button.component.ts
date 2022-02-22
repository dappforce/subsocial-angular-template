import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '../../../store/profile/profile.state';
import {
  SendTipsDialogData,
  SendTipsModalDialogComponent,
} from '../../modal-dialogs/send-tips-modal-dialog/send-tips-modal-dialog.component';

@Component({
  selector: 'app-send-tips-button',
  templateUrl: './send-tips-button.component.html',
  styleUrls: ['./send-tips-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendTipsButtonComponent {
  @Input() width: 'full' | 'static' = 'static';
  @Input() profile: Profile;
  @Input() disabled: boolean;

  constructor(private dialog: MatDialog) {}

  onClick() {
    const data: SendTipsDialogData = {
      profile: this.profile,
    };

    this.dialog.open(SendTipsModalDialogComponent, {
      width: '500px',
      data,
    });
  }
}
