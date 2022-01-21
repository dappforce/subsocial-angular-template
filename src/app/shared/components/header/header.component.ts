import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NavigationService } from '../../services/navigation.service';
import { TabLinkData } from '../../../core/models/tab-link-data.model';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  appName = environment.appName;

  constructor(
    public navService: NavigationService,
    public device: DeviceService
  ) {}

  onTabLinkClick(tab: TabLinkData) {
    this.navService.switchTab(tab);
  }

  ngOnInit(): void {}
}
