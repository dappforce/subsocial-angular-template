import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adblock-conflict-modal-dialog',
  templateUrl: './adblock-conflict-modal-dialog.component.html',
  styleUrls: ['./adblock-conflict-modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdblockConflictModalDialogComponent {
  reload() {
    window.location.reload();
  }
}
