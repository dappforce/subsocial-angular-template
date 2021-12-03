import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QrModalDialogComponent } from '../../../shared/modal-dialogs/qr-modal-dialog/qr-modal-dialog.component';

@Component({
  selector: 'app-qr-button',
  templateUrl: './qr-button.component.html',
  styleUrls: ['./qr-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrButtonComponent implements OnInit {
  @Input() address: string;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onClick() {
    this.dialog.open(QrModalDialogComponent, {
      data: this.address,
      maxWidth: '328px',
    });
  }
}
