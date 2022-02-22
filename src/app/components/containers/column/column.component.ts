import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoxComponent } from '../../../core/base-component/box.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent extends BoxComponent {}
