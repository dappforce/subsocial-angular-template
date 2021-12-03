import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabLinkData } from '../../../core/models/tab-link-data.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() tabLinks: TabLinkData[] = [];
  @Input() activeLink: TabLinkData;
  @Output() tabClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onTabClick(link: any) {
    this.activeLink = link;
    this.tabClick.emit(link);
  }
}
