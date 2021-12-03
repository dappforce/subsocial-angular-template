import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Params, Router } from '@angular/router';
import { TabLinkData } from '../../core/models/tab-link-data.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private activeTabSource = new BehaviorSubject<TabLinkData | null>({
    tabName: 'feed',
  });
  public activeTab$ = this.activeTabSource.asObservable();
  private isShowTabSource = new BehaviorSubject<boolean>(false);
  public isShowTab$ = this.isShowTabSource.asObservable();
  public tabLinks: TabLinkData[] = [
    { tabName: 'posts' },
    { tabName: 'spaces' },
  ];

  constructor(private router: Router) {}

  public switchTab(tab: TabLinkData) {
    const params: Params = { tab: tab.tabName };
    this.updateUrlQueryParams(params);
    this.activeTabSource.next(tab);
  }

  public showTab() {
    this.isShowTabSource.next(true);
  }

  public hideTab() {
    this.isShowTabSource.next(false);
    this.activeTabSource.next(null);
  }

  private updateUrlQueryParams(queryParam: Params) {
    this.router.navigate(['/'], {
      queryParams: queryParam,
    });
  }
}
