import { Injectable } from '@angular/core';
import { SignInModalDialogComponent } from '../sign-in-modal-dialog/sign-in-modal-dialog.component';
import { AccountService } from '../../../shared/services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { GetTokensModalDialogComponent } from '../get-tokens-modal-dialog/get-tokens-modal-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SignInModalService {
  constructor(
    private dialog: MatDialog,
    private accountService: AccountService
  ) {}

  async openModal(isTx?: boolean) {
    const { accounts, status } = await this.accountService.getSignInData();

    const dialogRef = this.dialog.open(SignInModalDialogComponent, {
      maxWidth: '432px',
      width: '90vw',
      data: {
        status,
        accounts,
        isTx,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((data) => !!data))
      .subscribe((account) => this.accountService.setCurrentAccount(account!));
  }

  openGetTokensModal() {
    this.dialog.open(GetTokensModalDialogComponent, {
      maxWidth: '432px',
      width: '90vw',
    });
  }
}
