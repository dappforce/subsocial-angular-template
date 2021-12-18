import { Injectable } from '@angular/core';
import { SubsocialApiService } from './subsocial-api.service';
import { ExtrinsicProps } from '../../core/base-component/tx-button.component';
import { SnackBarService } from './snack-bar.service';
import { MESSAGES } from '../../core/constants/messages';
import { SimpleSnackBarComponent } from '../components/simple-snack-bar/simple-snack-bar.component';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(
    private api: SubsocialApiService,
    private snackBarService: SnackBarService
  ) {}

  waitMessageRef: MatSnackBarRef<SimpleSnackBarComponent>;

  async getExtrinsic({ pallet, method, params }: ExtrinsicProps) {
    const api = await this.api.api.subsocial.substrate.api;
    if (!api.tx[pallet]) {
      throw new Error(`Unable to find api.tx.${pallet}`);
    } else if (!api.tx[pallet][method]) {
      throw new Error(`Unable to find api.tx.${pallet}.${method}`);
    }

    return api.tx[pallet][method](...params);
  }

  showSuccessMessage(message: string) {
    this.snackBarService.openSimpleSnackBar({
      message,
      isShowCloseButton: true,
      duration: 2000,
    });
  }

  showErrorMessage(message: string) {
    this.snackBarService.openSimpleSnackBar({
      message,
      iconName: 'error-icon',
      isShowCloseButton: true,
      duration: 3000,
      className: 'font-error',
    });
  }

  showWaitMessage() {
    this.waitMessageRef = this.snackBarService.openSimpleSnackBar({
      message: MESSAGES.WAITING_TX_COMPLETE,
      isWait: true,
    });
  }

  closeWaitMessage() {
    this.waitMessageRef.dismiss();
  }
}
