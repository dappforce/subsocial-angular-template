import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../../../shared/services/side-nav.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { ProfileComponentData } from '../../../core/types/profile-component-data.type';
import { Observable } from 'rxjs';
import { selectMyAccountProfileData } from '../../../state/profile/profile.selectors';
import {
  ACCOUNT_STATUS,
  AccountService,
} from '../../../shared/services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { SignInModalDialogComponent } from '../../../shared/modal-dialogs/sign-in-modal-dialog/sign-in-modal-dialog.component';
import { SignInModalData } from '../../../core/types/dialog-modal-data.types';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss'],
})
export class ProfileButtonComponent implements OnInit {
  constructor(
    public sideNavService: SideNavService,
    private store: Store<AppState>,
    public accountService: AccountService,
    private dialog: MatDialog
  ) {}

  isAuthorized: boolean = false;
  accountStatus: ACCOUNT_STATUS;
  signInModalData: SignInModalData = {
    status: ACCOUNT_STATUS.INIT,
  };

  profileData$: Observable<ProfileComponentData | undefined>;

  ngOnInit(): void {
    this.profileData$ = this.store.select(selectMyAccountProfileData);

    this.accountService.status$.subscribe((status) => {
      this.signInModalData.status = status;
    });

    this.accountService.getAccountsData().subscribe((accountData) => {
      this.signInModalData.accounts = accountData;
    });

    this.accountService.currentAccount$.subscribe(
      (currentAccount) => (this.isAuthorized = !!currentAccount)
    );
  }

  onSignInBtnClick() {
    this.dialog.open(SignInModalDialogComponent, {
      maxWidth: '430px',
      data: this.signInModalData,
    });
  }
}
