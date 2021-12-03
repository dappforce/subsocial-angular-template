import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: object): Observable<T> {
    const httpParams = new HttpParams(params);
    return this.http.get<T>(url, { params: httpParams });
  }
}
