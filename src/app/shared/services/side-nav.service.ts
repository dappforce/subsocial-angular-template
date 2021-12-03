import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  private isShowAccountSideNavSource = new BehaviorSubject<boolean>(false);
  public isShowAccountSideNav$: Observable<boolean> =
    this.isShowAccountSideNavSource.asObservable();

  constructor() {}

  openAccountSideNav() {
    this.isShowAccountSideNavSource.next(true);
  }

  closeAccountSideNav() {
    this.isShowAccountSideNavSource.next(false);
  }
}
