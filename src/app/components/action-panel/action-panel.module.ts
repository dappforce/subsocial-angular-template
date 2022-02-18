import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionPanelComponent } from './action-panel.component';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [ActionPanelComponent],
  imports: [CommonModule, ButtonsModule],
  exports: [ActionPanelComponent],
})
export class ActionPanelModule {}
