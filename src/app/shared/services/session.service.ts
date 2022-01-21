import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  offchainUrl = environment.offchainUrl;

  async addSessionKey(sessionCall: any) {
    await this.http
      .post(
        this.offchainUrl + '/v1/offchain/accounts/setSessionKey',
        sessionCall
      )
      .pipe(
        catchError((err) => {
          console.error(
            'Failed to add a session key to main account:',
            sessionCall.account,
            'res.status:',
            err.status
          );
          return of(null);
        })
      )
      .toPromise();
  }

  async getNonce(account: string) {
    return await this.http
      .get<string>(
        this.offchainUrl + `/v1/offchain/accounts/getNonce?account=${account}`
      )
      .toPromise();
  }

  async getSessionKey(account: string) {
    return await this.http
      .get(
        this.offchainUrl +
          `/v1/offchain/accounts/getSessionKey?account=${account}`,
        {}
      )
      .pipe(
        catchError((err) => {
          console.error(
            `Failed to check if a session key is known on offchain: ${account}`,
            err
          );
          return of(null);
        })
      )
      .toPromise();
  }
}
