import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FollowerService } from '../../shared/services/follower.service';
import { Space } from '../../state/space/space.state';

@Component({
  selector: 'app-space-profile',
  templateUrl: './space-profile.component.html',
  styleUrls: ['./space-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceProfileComponent implements OnInit {
  @Input() space: Space | null;
  @Input() isAutoExpandSummary: boolean;
  @Input() isMySpace: boolean | null;
  isFollowed$: Observable<boolean>;
  isHidden: boolean;

  constructor(private followerService: FollowerService) {}

  ngOnInit(): void {
    this.isHidden = !!this.space?.isHidden;

    this.isFollowed$ = this.followerService.checkIfFollowSpace(this.space?.id);
  }

  onSwitchHidden() {
    this.isHidden = !this.isHidden;
  }
}
