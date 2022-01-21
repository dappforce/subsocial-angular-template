import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../../../shared/services/side-nav.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { Observable } from 'rxjs';
import { selectMyAccountProfileData } from '../../../state/profile/profile.selectors';
import { AccountService } from '../../../shared/services/account.service';
import { map } from 'rxjs/operators';
import { Profile } from '../../../state/profile/profile.state';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss'],
})
export class ProfileButtonComponent implements OnInit {
  constructor(
    public sideNavService: SideNavService,
    private store: Store<AppState>,
    public accountService: AccountService
  ) {}

  isAuthorized$: Observable<boolean>;

  profileData$: Observable<Profile | undefined>;

  ngOnInit(): void {
    this.profileData$ = this.store.select(selectMyAccountProfileData);

    this.isAuthorized$ = this.accountService.currentAccount$.pipe(
      map((currentAccount) => !!currentAccount)
    );
  }
}
