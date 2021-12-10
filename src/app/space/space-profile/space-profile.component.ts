import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SpaceListItemData } from '../../core/models/space/space-list-item.model';
import { Observable } from 'rxjs';
import { FollowerService } from '../../shared/services/follower.service';

@Component({
  selector: 'app-space-profile',
  templateUrl: './space-profile.component.html',
  styleUrls: ['./space-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceProfileComponent implements OnInit, OnChanges {
  @Input() spaceItemData: SpaceListItemData | null;
  @Input() isAutoExpandSummary: boolean;
  isFollowed$: Observable<boolean>;
  isOwner: boolean;

  constructor(private followerService: FollowerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isOwner = this.spaceItemData?.struct.handle === 'subsocial';
  }

  ngOnInit(): void {
    this.isFollowed$ = this.followerService.checkIfFollowSpace(
      this.spaceItemData?.struct.id
    );
  }
}
