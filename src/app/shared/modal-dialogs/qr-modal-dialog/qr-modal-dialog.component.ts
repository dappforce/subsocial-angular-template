import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-qr-modal-dialog',
  templateUrl: './qr-modal-dialog.component.html',
  styleUrls: ['./qr-modal-dialog.component.scss'],
})
export class QrModalDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<QrModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  onCopy() {
    this.snackBarService.openSimpleSnackBar({
      message: 'Address copied!',
      isShowCloseButton: true,
      duration: 1000,
      iconName: 'info-icon',
    });
  }
}
