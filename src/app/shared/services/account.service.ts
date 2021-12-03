import { Injectable } from '@angular/core';
import { web3Enable } from '@polkadot/extension-dapp';
import { BehaviorSubject, forkJoin, from, Observable } from 'rxjs';
import { SubsocialApiService } from './subsocial-api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/state';
import { ProfileStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { MyAccountState } from '../../state/my-account/my-account.state';
import { loadMyProfile } from '../../state/profile/profile.actions';
import { asAccountId } from '@subsocial/api';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  AccountData,
  AccountRawData,
  Balance,
  PolkadotAccount,
} from '../../core/types/account.types';
import { formatBalance } from '@polkadot/util';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { ProfileData } from '@subsocial/api/flat-subsocial/dto';

export enum ACCOUNT_STATUS {
  INIT,
  EXTENSION_NOT_FOUND,
  ACCOUNTS_NOT_FOUND,
  UNAUTHORIZED,
  AUTHORIZED,
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountsSource = new BehaviorSubject<PolkadotAccount[]>([]);
  private currentAccountsSource = new BehaviorSubject<AccountData | null>(null);
  private statusSource = new BehaviorSubject<ACCOUNT_STATUS>(
    ACCOUNT_STATUS.INIT
  );

  private balanceSource = new BehaviorSubject<string>('');

  public accounts$ = this.accountsSource.asObservable();
  public currentAccount$ = this.currentAccountsSource.asObservable();
  public status$ = this.statusSource.asObservable();
  public balance$ = this.balanceSource.asObservable();

  constructor(
    private api: SubsocialApiService,
    private store: Store<AppState>,
    private storage: StorageService
  ) {
    const { decimals, currency: unit } = environment;
    formatBalance.setDefaults({ decimals, unit });
  }

  public async initAccount() {
    const injectedExtensions = await web3Enable('Subsocial');
    const polkadotJs = injectedExtensions.find(
      (extension) => extension.name === 'polkadot-js'
    );

    if (injectedExtensions.length === 0) {
      this.setStatus(ACCOUNT_STATUS.EXTENSION_NOT_FOUND);
    }

    if (!polkadotJs) return;

    const unsub = polkadotJs!.accounts.subscribe((accounts) => {
      if (accounts?.length > 0) {
        this.accountsSource.next(accounts as PolkadotAccount[]);
        this.setStatus(ACCOUNT_STATUS.UNAUTHORIZED);
      } else {
        this.setStatus(ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND);
      }
    });
  }

  public getAccountsData(): Observable<AccountData[]> {
    return this.accounts$.pipe(
      switchMap((accounts) =>
        this.getBalances(accounts).pipe(
          map((balances) => {
            return { accounts, balances };
          })
        )
      ),
      switchMap((data) =>
        from(this.loadProfilesByPolkadotAccount(data.accounts)).pipe(
          map((profiles) => {
            return { ...data, profiles };
          })
        )
      ),
      map((accountRawData) => this.extractAccountData(accountRawData)),
      tap((accountData) => this.checkIfAlreadySignIn(accountData))
    );
  }

  public extractAccountData(accountRawData: AccountRawData) {
    return accountRawData.accounts.map((account) => {
      const id = asAccountId(account.address)!.toString();
      const profile = accountRawData.profiles.find(
        (profile) => profile.id === id
      );
      const balance = accountRawData.balances.find(
        (balance) => balance.accountId.toString() === id
      )!;

      return {
        id,
        name: profile?.content?.name || account.name,
        balance: this.getFormattedBalance(balance),
        avatar: profile?.content?.avatar,
      } as AccountData;
    });
  }

  public async loadProfilesByPolkadotAccount(
    polkadotAccount: PolkadotAccount[]
  ) {
    const ids = polkadotAccount.map((account) => account.address);
    return await this.api.api.findProfiles(ids);
  }

  public async setCurrentAccount(account: AccountData) {
    await this.setBalance(account.id);
    this.store.dispatch(loadMyProfile({ id: account.id }));
    this.storage.setCurrentAccountId(account.id);
    this.currentAccountsSource.next(account);
  }

  public async loadProfile(id: string) {
    const profileData = await this.api.api.findProfile(id);
    if (profileData?.content && profileData?.struct) {
      const struct = profileData?.struct;
      if (struct) {
        const content = { ...profileData.content, id: struct.contentId };
        return { struct, content };
      }
    }

    return this.getAnonymousAccountData(id);
  }

  public getMyAccountData(profileStruct: ProfileStruct): MyAccountState {
    return { address: profileStruct.id, nonce: 0, blocked: false };
  }

  public signOut() {
    this.currentAccountsSource.next(null);
  }

  public async setBalance(address: string) {
    const balance = await this.getBalance(address);
    this.balanceSource.next(this.getFormattedBalance(balance));
  }

  public async getBalance(address: string) {
    const api = await this.api.api.subsocial.substrate.api;
    return await api.derive.balances.all(address);
  }

  public async loadFormattedBalance(address: string) {
    const balance = await this.getBalance(address);
    return this.getFormattedBalance(balance);
  }

  private setStatus(status: ACCOUNT_STATUS) {
    this.statusSource.next(status);
  }

  private getBalances(accounts: PolkadotAccount[]) {
    return forkJoin(
      accounts.map((account) => from(this.getBalance(account.address)))
    );
  }

  private getFormattedBalance(balance: Balance | undefined) {
    const [prefix, postfix] = balance
      ? formatBalance(balance.freeBalance, {
          forceUnit: '-',
          withSi: false,
        }).split('.')
      : ['0', undefined];

    return prefix + '.' + (postfix || '0000');
  }

  private async checkIfAlreadySignIn(accountData: AccountData[]) {
    const id = this.storage.getAccountId();
    const account = accountData.find((accountData) => accountData.id === id);
    if (account) {
      await this.setCurrentAccount(account);
    }
  }

  private getAnonymousAccountData(id: string) {
    return {
      id,
      struct: {
        id,
        followersCount: 0,
        followingAccountsCount: 0,
        followingSpacesCount: 0,
        reputation: 0,
        hasProfile: false,
      },
    } as ProfileData;
  }
}
