import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokensComponent } from './tokens/tokens.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TokensComponent],
  imports: [CommonModule, MatIconModule],
  exports: [TokensComponent],
})
export class BalanceModule {}
