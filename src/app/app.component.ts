import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { DeviceService } from './shared/services/device.service';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SubsocialApiService } from './shared/services/subsocial-api.service';
import { AppState } from './state/state';
import { Store } from '@ngrx/store';
import { SpaceService } from './space/services/space.service';
import { AccountService } from './shared/services/account.service';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { getFollowedSpaceIds } from './state/followed-space-ids/followed-space-ids.actions';
import { Subject } from 'rxjs';
import { getFollowedAccountIds } from './state/followed-account-ids/followed-account-ids.actions';
import { MyPostReactionFacade } from './state/my-post-reactions/my-post-reaction.facade';
import { TranslocoService } from '@ngneat/transloco';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private api: SubsocialApiService,
    private spaceService: SpaceService,
    private transloco: TranslocoService,
    private deviceService: DeviceService,
    private storageService: StorageService,
    private accountService: AccountService,
    private reactionFacade: MyPostReactionFacade,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.deviceService.init();
      await this.accountService.initAccount();
      this.getAccountAdditionalData();
      this.setLanguage();
    }
  }

  getAccountAdditionalData() {
    this.accountService.currentAccount$
      .pipe(
        tap(() => this.spaceService.getMyOwnSpaceIds()),
        filter((account) => !!account?.id),
        map((account) => account?.id!),
        tap((address: string) =>
          this.store.dispatch(getFollowedSpaceIds({ payload: { address } }))
        ),
        tap((address: string) =>
          this.store.dispatch(getFollowedAccountIds({ payload: { address } }))
        ),
        tap((_) => this.reactionFacade.reloadReactionForAllPosts()),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((_) => null);
  }

  setLanguage() {
    const savedLang = this.storageService.getLang();
    savedLang && this.transloco.setActiveLang(savedLang);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
