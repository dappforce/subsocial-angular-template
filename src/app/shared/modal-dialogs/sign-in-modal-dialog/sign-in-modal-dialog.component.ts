import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ACCOUNT_STATUS, AccountService } from '../../services/account.service';
import { SignInModalData } from '../../../core/types/dialog-modal-data.types';
import { environment } from '../../../../environments/environment';
import { AccountData } from '../../../core/types/account.types';

@Component({
  selector: 'app-sign-in-modal-dialog',
  templateUrl: './sign-in-modal-dialog.component.html',
  styleUrls: ['./sign-in-modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInModalDialogComponent implements OnInit {
  @Input() status: ACCOUNT_STATUS;

  ACCOUNT_STATUS = ACCOUNT_STATUS;
  ipfsUrl = environment.ipfsUrl;

  constructor(
    private accountService: AccountService,
    public dialogRef: MatDialogRef<SignInModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SignInModalData
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  async selectAccount(account: AccountData) {
    await this.accountService.setCurrentAccount(account);
    this.dialogRef.close();
  }
}
