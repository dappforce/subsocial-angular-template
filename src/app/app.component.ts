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
import { AppState } from './store/state';
import { Store } from '@ngrx/store';
import { SpaceService } from './space/services/space.service';
import { AccountService } from './shared/services/account.service';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { getFollowedSpaceIds } from './store/followed-space-ids/followed-space-ids.actions';
import { Subject } from 'rxjs';
import { getFollowedAccountIds } from './store/followed-account-ids/followed-account-ids.actions';
import { MyPostReactionFacade } from './store/my-post-reactions/my-post-reaction.facade';
import { StorageService } from './shared/services/storage.service';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { DateService } from './shared/services/date.service';

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
    private dateService: DateService,
    private api: SubsocialApiService,
    private spaceService: SpaceService,
    private deviceService: DeviceService,
    private storageService: StorageService,
    private accountService: AccountService,
    private reactionFacade: MyPostReactionFacade,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
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
    savedLang && this.i18NextService.changeLanguage(savedLang);
    this.i18NextService.events.languageChanged.subscribe((lang) => {
      lang && this.dateService.updateLocale(lang);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
