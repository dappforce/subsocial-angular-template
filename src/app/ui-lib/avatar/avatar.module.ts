import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { NgxJdenticonModule } from 'ngx-jdenticon';

@NgModule({
  declarations: [AvatarComponent],
  imports: [CommonModule, NgxJdenticonModule],
  exports: [AvatarComponent],
})
export class AvatarModule {}
