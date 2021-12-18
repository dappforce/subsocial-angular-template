import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { SpaceListItemData } from '../../../core/models/space/space-list-item.model';
import { AppState } from '../../../state/state';
import { selectFollowedSpaceIdsByCurrentAccount } from '../../../state/followed-space-ids/followed-space-ids.selectors';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FollowerService } from '../../../shared/services/follower.service';

@Component({
  selector: 'app-space-item',
  templateUrl: './space-item.component.html',
  styleUrls: ['./space-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceItemComponent implements OnInit {
  @Input() spaceItemData: SpaceListItemData | undefined;
  @Input() isEdit: boolean;
  @Input() itemType: 'list' | 'single' = 'list';
  isFollowed$: Observable<boolean>;

  constructor(private followerService: FollowerService) {}

  ngOnInit(): void {
    this.isFollowed$ = this.followerService.checkIfFollowSpace(
      this.spaceItemData?.struct.id
    );
  }
}
