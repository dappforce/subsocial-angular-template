import { Injectable } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import { filter, map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Activity } from '@subsocial/types';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Keypair } from '@polkadot/util-crypto/types';
import { naclSign } from '@polkadot/util-crypto';
import jsonabc from 'jsonabc';
import registry from '@subsocial/types/substrate/registry';
import { GenericAccountId } from '@polkadot/types';
import { stringToHex, u8aToHex, hexToU8a } from '@polkadot/util';
import { SessionService } from '../../shared/services/session.service';
import { StorageService } from '../../shared/services/storage.service';
import {
  mnemonicGenerate,
  mnemonicToMiniSecret,
  naclKeypairFromSeed,
} from '@polkadot/util-crypto';
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from '@polkadot/extension-dapp';
import { toSubsocialAddress } from '@subsocial/utils';
import { WebSocketSubject } from 'rxjs/webSocket';

export type ActivityType = 'notifications' | 'feed';

type SignMessageProps = {
  signer: string;
  message: string;
  address?: string;
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    private sessionService: SessionService,
    private storage: StorageService
  ) {}

  SESSION_KEY = 'df.sessionKeys';
  offchainUrl = environment.offchainUrl;

  notificationCountSource = new BehaviorSubject(0);
  notificationCount$: Observable<number> =
    this.notificationCountSource.asObservable();

  setNotificationCount(count: string) {
    const countNumber = Number.parseInt(count);
    this.notificationCountSource.next(countNumber);
  }

  getNotificationCount(id: string) {
    return this.getActivityCount(id, 'notifications').pipe(
      map((count) => Number.parseInt(count))
    );
  }

  getActivityCount(accountId: string, type: ActivityType) {
    const url = `${this.offchainUrl}/v1/offchain/${type}/${accountId}/count`;
    return this.http.get<string>(url);
  }

  loadNotificationActivity(accountId: string, offset: number, limit: number) {
    let params = new HttpParams();
    params = params.append('offset', offset);
    params = params.append('limit', limit);
    const url = `${this.offchainUrl}/v1/offchain/notifications/${accountId}`;

    return this.http.get<Activity[]>(url, { params });
  }

  signOffchainMessage(message: Object, keypair: Partial<Keypair>) {
    return naclSign(this.JSONstingifySorted(message), keypair);
  }

  JSONstingifySorted(obj: Object) {
    return JSON.stringify(jsonabc.sortObj(obj));
  }

  newGenericAccount(account: string | undefined) {
    return account ? String(new GenericAccountId(registry, account)) : '';
  }

  async createSessionKey(address?: string): Promise<any | undefined> {
    if (!address) return;

    try {
      const extensions = await web3Enable(environment.appName);
      if (!extensions.length) return;

      const allAccounts = await web3Accounts();

      const account = allAccounts.find(
        (x) => new GenericAccountId(registry, x.address)
      );
      if (!account) return;

      const { publicKey, secretKey } = this.generateKeyPair();

      const publicKeyHex = u8aToHex(publicKey);
      const secretKeyHex = u8aToHex(secretKey);

      const selectedNonce = await this.sessionService.getNonce(address);
      let nonce = 0;
      if (selectedNonce) nonce = parseInt(selectedNonce);

      const message: any = {
        nonce,
        action: 'addSessionKey',
        args: {
          sessionKey: publicKeyHex,
        },
      };

      const signature = await this.signMessage({
        signer: account.address,
        address,
        message: this.JSONstingifySorted(message),
      });
      if (!signature) return;

      const sessionKey: any = {
        publicKey: publicKeyHex,
        secretKey: secretKeyHex,
      };

      const storage: any = this.storage.get(this.SESSION_KEY) || {};

      storage[address] = sessionKey;

      this.storage.set(this.SESSION_KEY, storage);

      await this.sessionService.addSessionKey({
        account: address,
        signature,
        message,
      });

      return sessionKey;
    } catch (err) {
      console.error(`Failed to create session key: ${err}`);
      return;
    }
  }

  generateKeyPair(): Keypair {
    const mnemonic = mnemonicGenerate();
    const seed = mnemonicToMiniSecret(mnemonic);
    const keypair = naclKeypairFromSeed(seed);

    return keypair;
  }

  async signMessage(props: SignMessageProps): Promise<string | undefined> {
    const { signer, message, address } = props;

    const injector = await web3FromAddress(signer);

    const signRaw = injector?.signer?.signRaw;

    if (!!signRaw) {
      const { signature } = await signRaw({
        address: address || signer,
        data: stringToHex(message),
        type: 'bytes',
      });
      return signature;
    }
    return undefined;
  }

  async manageSessionKey(address: string): Promise<any | undefined> {
    const sessionKeyStorage = this.storage.get(this.SESSION_KEY);
    let sessionKey: any | undefined = undefined;

    for (const key in sessionKeyStorage) {
      if (key == address) {
        sessionKey = sessionKeyStorage[key];
        break;
      }
    }

    const genericSessionKey = this.newGenericAccount(sessionKey?.publicKey);
    const isSessionKey = await this.sessionService.getSessionKey(
      genericSessionKey
    );
    if (!sessionKey || !isSessionKey) {
      sessionKey = await this.createSessionKey(address);
      if (!sessionKey) return;
    }

    const keypair = {
      publicKey: hexToU8a(sessionKey.publicKey),
      secretKey: hexToU8a(sessionKey.secretKey),
    } as Keypair;

    const genericAccount = new GenericAccountId(
      registry,
      u8aToHex(keypair.publicKey)
    ).toString();

    const subsocialAddress = toSubsocialAddress(genericAccount);

    if (!subsocialAddress) return;

    const currentNonce = await this.sessionService.getNonce(subsocialAddress);
    let nonce = 0;
    if (currentNonce) {
      nonce = parseInt(currentNonce);
    }

    return { nonce, keypair, genericAccount: subsocialAddress };
  }

  async readAllNotifications(
    blockNumber: string,
    eventIndex: number,
    address: string,
    wsSubject: WebSocketSubject<any>
  ) {
    const sessionKey = await this.manageSessionKey(address);

    if (!sessionKey) return;

    const message = {
      nonce: sessionKey.nonce,
      action: 'readAll',
      args: {
        blockNumber,
        eventIndex,
      },
    };

    const signature = this.signOffchainMessage(message, sessionKey.keypair);
    if (!signature) return;

    wsSubject.next({
      account: String(sessionKey.genericAccount),
      signature: u8aToHex(signature),
      message,
    });
  }
}
