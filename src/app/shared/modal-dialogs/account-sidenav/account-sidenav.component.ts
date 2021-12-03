import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SideNavService } from '../../services/side-nav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { DeviceService } from '../../services/device.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { selectMyAccountProfileData } from '../../../state/profile/profile.selectors';
import { ProfileComponentData } from '../../../core/types/profile-component-data.type';
import { AccountService } from '../../services/account.service';
import { StorageService } from '../../services/storage.service';
import { AccountData } from '../../../core/types/account.types';
import { Subject } from 'rxjs';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';

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
  myProfileData: ProfileComponentData;

  private myProfileData$ = this.store.select(selectMyAccountProfileData);
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
    this.getMyProfile();
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

  private getMyProfile() {
    this.myProfileData$
      .pipe(
        filter((profile) => !!profile),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((myProfile) => {
        this.myProfileData = myProfile!;
        this.cd.markForCheck();
      });
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
          (data) => data.id !== accountWithProfile.profile!.address
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.next();
    this.unsubscribe$?.complete();
  }
}
