import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { ContainersModule } from '../containers/containers.module';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { I18NextModule } from 'angular-i18next';
import { LeftSideMenuComponent } from './left-side-menu/left-side-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { PostMenuComponent } from './post-menu/post-menu.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommentMenuComponent } from './comment-menu/comment-menu.component';
import { SpaceMenuComponent } from './space-menu/space-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@NgModule({
  declarations: [
    SidenavMenuComponent,
    LeftSideMenuComponent,
    PostMenuComponent,
    CommentMenuComponent,
    SpaceMenuComponent,
    MenuItemComponent,
    ProfileMenuComponent,
  ],
  exports: [
    SidenavMenuComponent,
    LeftSideMenuComponent,
    PostMenuComponent,
    CommentMenuComponent,
    SpaceMenuComponent,
    ProfileMenuComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ContainersModule,
    MatRippleModule,
    RouterModule,
    MatDividerModule,
    ButtonsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    I18NextModule,
  ],
})
export class MenuModule {}
