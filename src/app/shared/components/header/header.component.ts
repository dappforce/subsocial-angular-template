import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NavigationService } from '../../services/navigation.service';
import { TabLinkData } from '../../../core/models/tab-link-data.model';
import { DeviceService } from '../../services/device.service';
import { AccountService } from '../../services/account.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  appName = environment.appName;

  constructor(
    public navService: NavigationService,
    public device: DeviceService,
    private accountService: AccountService
  ) {}

  onTabLinkClick(tab: TabLinkData) {
    this.navService.switchTab(tab);
  }

  ngOnInit(): void {
    this.accountService.currentAccount$
      .pipe(map((account) => !!account))
      .subscribe((isLogin) => {
        this.navService.addOrRemoveFeed(isLogin);
      });
  }
}
