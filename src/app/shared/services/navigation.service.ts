import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Params, Router } from '@angular/router';
import { TabLinkData } from '../../core/models/tab-link-data.model';

const TABS_NAME = {
  FEED: 'feed',
  POSTS: 'posts',
  SPACES: 'spaces',
};

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private activeTabSource = new BehaviorSubject<TabLinkData | null>({
    tabName: TABS_NAME.FEED,
  });
  public activeTab$ = this.activeTabSource.asObservable();
  private isShowTabSource = new BehaviorSubject<boolean>(false);
  public isShowTab$ = this.isShowTabSource.asObservable();
  public tabLinks: TabLinkData[] = [
    { tabName: TABS_NAME.POSTS },
    { tabName: TABS_NAME.SPACES },
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

  public addOrRemoveFeed(type: boolean) {
    const isFeed = this.tabLinks.some((tab) => tab.tabName === TABS_NAME.FEED);

    if (type && !isFeed) {
      this.tabLinks = [{ tabName: TABS_NAME.FEED }, ...this.tabLinks];
    }

    if (!type && isFeed) {
      this.tabLinks = this.tabLinks.slice(1);
      this.switchTab(this.tabLinks[0]);
    }
  }

  private updateUrlQueryParams(queryParam: Params) {
    this.router.navigate(['/'], {
      queryParams: queryParam,
    });
  }
}
