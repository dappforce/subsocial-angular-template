import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ButtonsModule } from '../buttons/buttons.module';
import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ClipboardModule,
    ButtonsModule,
    PipesModule,
  ],
  exports: [AddressComponent],
})
export class AddressModule {}
