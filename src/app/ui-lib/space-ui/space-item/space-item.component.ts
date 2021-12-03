import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { SpaceListItemData } from '../../../core/models/space/space-list-item.model';

@Component({
  selector: 'app-space-item',
  templateUrl: './space-item.component.html',
  styleUrls: ['./space-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceItemComponent {
  @Input() spaceItemData: SpaceListItemData | undefined;
  @Input() isEdit: boolean;
  @Input() itemType: 'list' | 'single' = 'list';

  constructor() {}
}
