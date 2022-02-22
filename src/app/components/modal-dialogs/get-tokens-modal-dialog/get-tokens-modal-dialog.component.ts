import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-tokens-modal-dialog',
  templateUrl: './get-tokens-modal-dialog.component.html',
  styleUrls: ['./get-tokens-modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetTokensModalDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<GetTokensModalDialogComponent>) {}

  ngOnInit(): void {}
}
