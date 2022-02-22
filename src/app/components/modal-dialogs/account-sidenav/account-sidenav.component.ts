import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SideNavService } from '../../../shared/services/side-nav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { DeviceService } from '../../../shared/services/device.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state';
import { selectMyAccountProfileData } from '../../../store/profile/profile.selectors';
import { AccountService } from '../../../shared/services/account.service';
import { StorageService } from '../../../shared/services/storage.service';
import { AccountData } from '../../../core/types/account.types';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { Profile } from '../../../store/profile/profile.state';
import { DOCUMENT } from '@angular/common';

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

  constructor(
    public accountService: AccountService,
    public sideNavService: SideNavService,
    public deviceService: DeviceService,
    private store: Store<AppState>,
    private storage: StorageService,
    private cd: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  accounts: AccountData[] = [];

  myProfileData$: Observable<Profile | undefined> = this.store.select(
    selectMyAccountProfileData
  );
  private unsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.getAccountsData();
  }

  ngAfterViewInit(): void {
    this.sideNavService.isShowAccountSideNav$.subscribe((isShow) => {
      isShow ? this.sideNav.open() : this.sideNav.close();
      this.cd.markForCheck();
    });
    //
    // this.sideNav.openedChange.subscribe((isOpen) => {
    //   if (isOpen) {
    //     this.document.body.classList.add('fixed');
    //   } else {
    //     this.document.body.classList.remove('fixed');
    //   }
    //   this.cd.markForCheck();
    // });
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
