import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NavigationService } from '../../services/navigation.service';
import { TabLinkData } from '../../../core/models/tab-link-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  appName = environment.appName;

  constructor(public navService: NavigationService) {}

  ngOnInit(): void {}

  onTabLinkClick(tab: TabLinkData) {
    this.navService.switchTab(tab);
  }
}
