import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SimpleSnackBarComponent,
  SimpleSnackBarOption,
} from '../components/simple-snack-bar/simple-snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(readonly snackBar: MatSnackBar) {}

  public openSimpleSnackBar(options: SimpleSnackBarOption) {
    return this.snackBar.openFromComponent(SimpleSnackBarComponent, {
      data: options,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: options.duration,
      panelClass: ['white-snackbar'],
    });
  }

  showErrorMessage(message: string) {
    this.openSimpleSnackBar({
      message,
      iconName: 'error-icon',
      isShowCloseButton: true,
      duration: 3000,
      className: 'font-error',
    });
  }
}
