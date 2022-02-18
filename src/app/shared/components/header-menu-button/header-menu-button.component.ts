import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { LeftSideMenuComponent } from '../../../components/menu/left-side-menu/left-side-menu.component';

@Component({
  selector: 'app-header-menu-button',
  templateUrl: './header-menu-button.component.html',
  styleUrls: ['./header-menu-button.component.scss'],
})
export class HeaderMenuButtonComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  @ViewChild(LeftSideMenuComponent) leftMenu: LeftSideMenuComponent;

  isOpen: boolean;
  ngOnInit(): void {}

  switchMenu(status: boolean) {
    if (status) {
      this.document.body.classList.add('hidden-scroll');
    } else {
      this.document.body.classList.remove('hidden-scroll');
    }
    this.leftMenu.mobileSwitchState(status);
    this.isOpen = status;
  }
}
