import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostListItemData } from '../../../core/models/post/post-list-item.model';
import { SpaceListItemData } from '../../../core/models/space/space-list-item.model';

@Component({
  selector: 'app-qr-modal-dialog',
  templateUrl: './qr-modal-dialog.component.html',
  styleUrls: ['./qr-modal-dialog.component.scss'],
})
export class QrModalDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<QrModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onCopy() {
    this._snackBar.open('Address copied!', 'Ok', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 1000,
    });
  }
}
