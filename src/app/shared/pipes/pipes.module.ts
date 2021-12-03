import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluralizePipe } from './pluralize.pipe';
import { DayjsPipe } from './dayjs.pipe';
import { LinkToIconPipe } from './link-to-icon.pipe';
import { NumeralPipe } from './numeral.pipe';
import { AddressHiddenPipe } from './address-hidden.pipe';

@NgModule({
  declarations: [
    PluralizePipe,
    DayjsPipe,
    LinkToIconPipe,
    NumeralPipe,
    AddressHiddenPipe,
  ],
  imports: [CommonModule],
  exports: [
    NumeralPipe,
    PluralizePipe,
    DayjsPipe,
    LinkToIconPipe,
    AddressHiddenPipe,
  ],
  providers: [PluralizePipe],
})
export class PipesModule {}
