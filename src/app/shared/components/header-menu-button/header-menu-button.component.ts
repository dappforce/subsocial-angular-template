import { Component, OnInit, ViewChild } from '@angular/core';
import { LeftSideMenuComponent } from '../../../ui-lib/menu/left-side-menu/left-side-menu.component';

@Component({
  selector: 'app-header-menu-button',
  templateUrl: './header-menu-button.component.html',
  styleUrls: ['./header-menu-button.component.scss'],
})
export class HeaderMenuButtonComponent implements OnInit {
  constructor() {}

  isOpen: boolean;
  ngOnInit(): void {}
}
