import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowComponent } from './row/row.component';
import { ColumnComponent } from './column/column.component';
import { ScrollComponent } from './scroll/scroll.component';

@NgModule({
  declarations: [RowComponent, ColumnComponent, ScrollComponent],
  exports: [RowComponent, ColumnComponent, ScrollComponent],
  imports: [CommonModule],
})
export class ContainersModule {}
