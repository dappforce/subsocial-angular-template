import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profile } from '../../../state/profile/profile.state';
import { AccountService } from '../../../shared/services/account.service';
import { BaseTxComponent } from '../../../core/base-component/base-tx.component';
import { TransactionService } from '../../../shared/services/transaction.service';
import { SignInModalService } from '../services/sign-in-modal.service';
import { SubmittableResult } from '@polkadot/api';
import { FormControl, Validators } from '@angular/forms';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { METHODS, PALLETS } from '../../../core/constants/query.const';
import { ConvertService } from '../../../shared/services/convert.service';
import { Observable, Subject } from 'rxjs';

export type SendTipsDialogData = {
  profile: Profile;
};

@Component({
  selector: 'app-send-tips-modal-dialog',
  templateUrl: './send-tips-modal-dialog.component.html',
  styleUrls: ['./send-tips-modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendTipsModalDialogComponent
  extends BaseTxComponent
  implements OnInit
{
  constructor(
    public dialogRef: MatDialogRef<SendTipsModalDialogComponent>,
    public account: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: SendTipsDialogData,
    public transaction: TransactionService,
    public cd: ChangeDetectorRef,
    public signIn: SignInModalService,
    private convert: ConvertService
  ) {
    super(transaction, account, signIn, cd);
  }

  balance = Number.parseFloat(
    this.account.getCurrentBalance().replace(',', '')
  );

  amountControl = new FormControl('', [
    Validators.required,
    Validators.max(this.balance),
  ]);

  errorKey$ = this.amountControl.statusChanges.pipe(
    map((_) => this.amountControl.errors),
    map((error) => (!!error ? Object.keys(error)[0] : null))
  );

  ngOnInit(): void {}

  onFailed(result: SubmittableResult): void {}

  onSuccess(result: SubmittableResult): void {}

  validate(): boolean {
    return this.amountControl.valid;
  }

  async onSendTips() {
    this.amountControl.markAsTouched();

    if (this.amountControl.valid) {
      const pallet = PALLETS.balances;
      const method = METHODS.transfer;

      const dest = {
        id: this.data.profile.id,
      };

      const balance = this.convert.convertBalance(this.amountControl.value);

      const params = [dest, balance];

      await this.initExtrinsic({ pallet, params, method });

      await this.sentTransaction();
    } else {
      this.amountControl.setErrors({ required: true });
    }
  }
}
