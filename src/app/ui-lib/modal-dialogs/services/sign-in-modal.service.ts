import { Injectable } from '@angular/core';
import { SignInModalDialogComponent } from '../sign-in-modal-dialog/sign-in-modal-dialog.component';
import { AccountService } from '../../../shared/services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

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
      maxWidth: '430px',
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
}
