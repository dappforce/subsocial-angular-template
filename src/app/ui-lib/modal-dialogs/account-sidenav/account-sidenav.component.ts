import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SideNavService } from '../../../shared/services/side-nav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { DeviceService } from '../../../shared/services/device.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { selectMyAccountProfileData } from '../../../state/profile/profile.selectors';
import { AccountService } from '../../../shared/services/account.service';
import { StorageService } from '../../../shared/services/storage.service';
import { AccountData } from '../../../core/types/account.types';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { Profile } from '../../../state/profile/profile.state';

@Component({
  selector: 'app-account-sidenav',
  templateUrl: './account-sidenav.component.html',
  styleUrls: ['./account-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSidenavComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatSidenav) sideNav: MatSidenav;

  accounts: AccountData[] = [];

  myProfileData$: Observable<Profile | undefined> = this.store.select(
    selectMyAccountProfileData
  );
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public accountService: AccountService,
    public sideNavService: SideNavService,
    public deviceService: DeviceService,
    private store: Store<AppState>,
    private storage: StorageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAccountsData();
  }

  ngAfterViewInit(): void {
    this.sideNavService.isShowAccountSideNav$.subscribe((isShow) => {
      isShow ? this.sideNav.open() : this.sideNav.close();
      this.cd.markForCheck();
    });
  }

  signOut() {
    this.storage.removeAccountId();
    this.accountService.signOut();
    this.sideNavService.closeAccountSideNav();
  }

  async onChangeAccount(account: AccountData) {
    const currentAccount = this.accounts.find(
      (accountData) => accountData.id === account.id
    );

    if (currentAccount) {
      await this.accountService.setCurrentAccount(currentAccount);
    }
  }

  private getAccountsData() {
    this.accountService
      .getAccountsData()
      .pipe(
        mergeMap((accountData) =>
          this.myProfileData$.pipe(
            filter((myProfile) => !!myProfile),
            map((myProfile) => {
              return { accounts: accountData, profile: myProfile };
            })
          )
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((accountWithProfile) => {
        this.accounts = accountWithProfile.accounts.filter(
          (data) => data.id !== accountWithProfile.profile!.id
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.next();
    this.unsubscribe$?.complete();
  }
}
