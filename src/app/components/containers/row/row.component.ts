import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { BoxComponent } from '../../../core/base-component/box.component';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent extends BoxComponent {}
