import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TabLinkData } from '../../core/models/tab-link-data.model';
import { DeviceService } from '../../shared/services/device.service';
import {
  loadProfile,
  saveProfilesSuccess,
} from '../../state/profile/profile.actions';
import { ActivatedRoute } from '@angular/router';
import { map, take, takeUntil } from 'rxjs/operators';
import { selectProfileDataById } from '../../state/profile/profile.selectors';
import { Subject } from 'rxjs';
import { ProfileComponentData } from '../../core/types/profile-component-data.type';
import { SpaceService } from '../../space/services/space.service';
import { PostService } from '../../post/services/post.service';
import { AccountService } from '../../shared/services/account.service';
import { StoreService } from '../../state/store.service';

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
  spaceIds: string[] = [];
  postIds: string[] = [];
  tokens: string;
  profileData: ProfileComponentData | undefined;

  private destroy$ = new Subject<void>();

  constructor(
    public device: DeviceService,
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private postService: PostService,
    private cd: ChangeDetectorRef,
    private accountService: AccountService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('userId') as string),
        takeUntil(this.destroy$)
      )
      .subscribe((userId) => {
        this.loadProfileData(userId).then();
      });
  }

  private async loadProfileData(userId: string) {
    this.profileData = await this.storeService.getOrLoadEntities(
      selectProfileDataById,
      loadProfile,
      saveProfilesSuccess,
      userId,
      { id: userId }
    );

    const address = this.profileData?.address!;

    this.tokens = await this.accountService.loadFormattedBalance(address);

    this.clearIds();

    this.spaceIds = await this.spaceService.getSpaceIdsByAccount(address);

    this.postIds = await this.postService
      .getPostIdsBySpaceIds(this.spaceIds)
      .pipe(take(1))
      .toPromise();

    this.cd.markForCheck();
  }

  onTabClick(tabData: TabLinkData) {
    this.activeTab = tabData;
    this.cd.markForCheck();
  }

  clearIds() {
    this.postIds = [];
    this.spaceIds = [];
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
