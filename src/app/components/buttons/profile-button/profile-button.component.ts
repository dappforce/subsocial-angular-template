import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../../../shared/services/side-nav.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state';
import { Observable } from 'rxjs';
import { selectMyAccountProfileData } from '../../../store/profile/profile.selectors';
import { AccountService } from '../../../shared/services/account.service';
import { map } from 'rxjs/operators';
import { Profile } from '../../../store/profile/profile.state';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignInModalDialogComponent } from '../../modal-dialogs/sign-in-modal-dialog/sign-in-modal-dialog.component';
import { AccountData } from '../../../core/types/account.types';
import { SignInModalService } from '../../modal-dialogs/services/sign-in-modal.service';

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
    private dialog: MatDialog,
    private signInModalService: SignInModalService
  ) {}

  isAuthorized$: Observable<boolean>;
  balance$: Observable<string>;

  profileData$: Observable<Profile | undefined>;
  dialogRef: MatDialogRef<SignInModalDialogComponent, AccountData>;

  ngOnInit(): void {
    this.profileData$ = this.store.select(selectMyAccountProfileData);
    this.balance$ = this.accountService.balance$;

    this.isAuthorized$ = this.accountService.currentAccount$.pipe(
      map((currentAccount) => !!currentAccount)
    );
  }

  async openSignInModal() {
    await this.signInModalService.openModal();
  }
}
