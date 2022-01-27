import { Injectable } from '@angular/core';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { BehaviorSubject, forkJoin, from, Observable } from 'rxjs';
import { SubsocialApiService } from './subsocial-api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/state';
import { MyAccountState } from '../../state/my-account/my-account.state';
import { loadMyProfile } from '../../state/profile/profile.actions';
import { asAccountId } from '@subsocial/api';
import { map, switchMap, take, tap } from 'rxjs/operators';
import {
  AccountData,
  AccountRawData,
  Balance,
  PolkadotAccount,
} from '../../core/types/account.types';
import { formatBalance } from '@polkadot/util';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { SignInModalService } from '../../ui-lib/modal-dialogs/services/sign-in-modal.service';

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
  private signerSource = new BehaviorSubject<any | null>(null);
  private statusSource = new BehaviorSubject<ACCOUNT_STATUS>(
    ACCOUNT_STATUS.INIT
  );
  private balanceSource = new BehaviorSubject<string>('');
  public accounts$ = this.accountsSource.asObservable();
  public currentAccount$ = this.currentAccountsSource.asObservable();
  public status$ = this.statusSource.asObservable();
  public balance$ = this.balanceSource.asObservable();
  public signer$ = this.signerSource.asObservable();

  private balanceUnsub: Function;

  constructor(
    private api: SubsocialApiService,
    private store: Store<AppState>,
    private storage: StorageService
  ) {
    const { decimals, currency: unit } = environment;
    formatBalance.setDefaults({ decimals, unit });
  }

  public getCurrentAccountId() {
    return this.currentAccountsSource.value?.id;
  }

  public async initAccount() {
    const injectedExtensions = await web3Enable('Subsocial');
    const polkadotJs = injectedExtensions.find(
      (extension: any) => extension.name === 'polkadot-js'
    );

    if (injectedExtensions.length === 0) {
      this.setStatus(ACCOUNT_STATUS.EXTENSION_NOT_FOUND);
    }

    if (!polkadotJs) return;

    this.signerSource.next(polkadotJs.signer);

    const accounts = await web3Accounts();
    if (accounts?.length > 0) {
      this.accountsSource.next(accounts as unknown as PolkadotAccount[]);
      this.setStatus(ACCOUNT_STATUS.UNAUTHORIZED);
    } else {
      this.setStatus(ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND);
    }
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
    if (this.balanceUnsub) {
      this.balanceUnsub();
    }

    await this.subscribeOnBalance(account.id);
    this.store.dispatch(loadMyProfile({ id: account.id }));
    this.storage.setCurrentAccountId(account.id);
    this.currentAccountsSource.next(account);
  }

  public getMyAccountData(address: string): MyAccountState {
    return { address, nonce: 0, blocked: false };
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

  public async getSignInData() {
    const status = this.statusSource.value;
    let accounts: AccountData[] = [];
    if (status === ACCOUNT_STATUS.UNAUTHORIZED) {
      accounts = await this.getAccountsData().pipe(take(1)).toPromise();
    }

    return { accounts, status };
  }

  private async subscribeOnBalance(address: string) {
    const api = await this.api.api.subsocial.substrate.api;
    this.balanceUnsub = await api.derive.balances.all(address, (data: any) => {
      this.balanceSource.next(this.getFormattedBalance(data));
    });
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
}
