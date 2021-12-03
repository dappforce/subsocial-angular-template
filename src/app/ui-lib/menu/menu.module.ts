import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { ContainersModule } from '../containers/containers.module';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavMenuComponent],
  exports: [SidenavMenuComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ContainersModule,
    MatRippleModule,
    RouterModule,
  ],
})
export class MenuModule {}
