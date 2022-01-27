import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { FollowerService } from '../../../shared/services/follower.service';
import { AccountService } from '../../../shared/services/account.service';
import { Space } from '../../../state/space/space.state';
import { SpaceFacade } from '../../../state/space/space.facade';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-space-item',
  templateUrl: './space-item.component.html',
  styleUrls: ['./space-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceItemComponent implements OnInit {
  @Input() space: Space | undefined | null;
  @Input() itemType: 'list' | 'single' = 'list';
  @Input() showHidden: boolean | undefined;
  isFollowed$: Observable<boolean>;
  skip$: Observable<boolean>;

  constructor(
    private followerService: FollowerService,
    private cd: ChangeDetectorRef,
    private accountService: AccountService,
    private spaceFacade: SpaceFacade
  ) {}

  ngOnInit(): void {
    this.isFollowed$ = this.followerService.checkIfFollowSpace(this.space?.id);

    this.skip$ = combineLatest([
      this.accountService.currentAccount$,
      this.spaceFacade.getSpace(this.space!.id),
    ]).pipe(
      filter(([account, space]) => !!account && !!space),
      map(([account, space]) => {
        const isOwner = account!.id === space!.ownerId;
        return space!.isHidden
          ? isOwner
            ? !this.showHidden
            : true
          : space!.isHidden;
      })
    );
  }
}
