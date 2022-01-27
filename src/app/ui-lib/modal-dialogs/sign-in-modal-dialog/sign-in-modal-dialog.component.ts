import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ACCOUNT_STATUS,
  AccountService,
} from '../../../shared/services/account.service';
import { SignInModalData } from '../../../core/types/dialog-modal-data.types';
import { environment } from '../../../../environments/environment';
import { AccountData } from '../../../core/types/account.types';
import { LINKS } from '../../../core/constants/links.const';
import { SignInModalService } from '../services/sign-in-modal.service';

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

  LINKS = LINKS;

  constructor(
    public dialogRef: MatDialogRef<SignInModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SignInModalData
  ) {}

  ngOnInit(): void {}

  selectAccount(account: AccountData) {
    this.dialogRef.close(account);
  }
}