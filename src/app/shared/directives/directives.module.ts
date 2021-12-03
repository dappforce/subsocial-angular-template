import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfMobileDirective } from './if-mobile.directive';
import { IfDesktopDirective } from './if-desktop.directive';

@NgModule({
  declarations: [IfMobileDirective, IfDesktopDirective],
  imports: [CommonModule],
  exports: [IfMobileDirective, IfDesktopDirective],
})
export class DirectivesModule {}
