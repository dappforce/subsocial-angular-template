import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Activity } from '@subsocial/types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpService) {}

  offchainUrl = environment.offchainUrl;

  getFeedActivities(accountId: string, offset: number, limit: number) {
    const url = `${this.offchainUrl}/v1/offchain/feed/${accountId}?offset=${offset}&limit=${limit}`;

    return this.http.get<Activity[]>(url);
  }

  getFeedCount(accountId: string) {
    const url = `${this.offchainUrl}/v1/offchain/feed/${accountId}/count`;

    return this.http.get<string>(url);
  }
}
