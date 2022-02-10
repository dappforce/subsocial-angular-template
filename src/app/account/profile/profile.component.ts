import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TabLinkData } from '../../core/models/tab-link-data.model';
import { DeviceService } from '../../shared/services/device.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { combineLatest, from, Observable, Subject } from 'rxjs';
import { SpaceService } from '../../space/services/space.service';
import { PostService } from '../../post/services/post.service';
import { AccountService } from '../../shared/services/account.service';
import { FollowerService } from '../../shared/services/follower.service';
import { Profile } from '../../state/profile/profile.state';
import { ProfileFacade } from '../../state/profile/profile.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  public tabLinks: TabLinkData[] = [
    { tabName: 'posts' },
    { tabName: 'spaces' },
  ];

  activeTab = this.tabLinks[0];
  spaceIds$: Observable<string[] | null>;
  postIds$: Observable<string[] | null>;
  tokens$: Observable<string>;
  profileData$: Observable<Profile | undefined>;
  isFollow$: Observable<boolean>;
  isMyProfile$: Observable<boolean>;

  private destroy$ = new Subject<void>();

  constructor(
    public device: DeviceService,
    public spaceService: SpaceService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private postService: PostService,
    private profileFacade: ProfileFacade,
    private accountService: AccountService,
    private followerService: FollowerService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const userId$ = this.route.paramMap.pipe(
      map((params) => params.get('userId') as string),
      tap((id) => this.profileFacade.loadProfile(id))
    );

    this.profileData$ = userId$.pipe(
      mergeMap((id) => this.profileFacade.getProfile(id))
    );

    this.tokens$ = this.profileData$.pipe(
      switchMap((profile) =>
        from(this.accountService.loadFormattedBalance(profile!.id))
      )
    );

    this.spaceIds$ = this.profileData$.pipe(
      switchMap((profile) =>
        from(this.spaceService.getSpaceIdsByAccount(profile!.id))
      ),
      filter((ids) => ids.length > 0)
    );

    this.postIds$ = this.spaceIds$.pipe(
      filter((ids) => !!ids),
      switchMap((spaceIds) => this.postService.getPostIdsBySpaceIds(spaceIds!)),
      filter((ids) => ids.length > 0)
    );

    this.isMyProfile$ = combineLatest([
      this.profileData$,
      this.accountService.currentAccount$,
    ]).pipe(
      filter(([profile, account]) => !!profile && !!account),
      map(([profile, account]) => profile!.id === account!.id)
    );

    this.isFollow$ = this.profileData$.pipe(
      switchMap((profile) =>
        this.followerService.checkIfFollowAccount(profile?.id)
      )
    );
  }

  onTabClick(tabData: TabLinkData) {
    this.activeTab = tabData;
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
