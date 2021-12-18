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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private api: SubsocialApiService,
    private spaceService: SpaceService,
    private accountService: AccountService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.deviceService.init();
      await this.accountService.initAccount();
      this.getFollowedSpaceIds();
    }
  }

  getFollowedSpaceIds() {
    this.accountService.currentAccount$
      .pipe(
        filter((account) => !!account?.id),
        map((account) => account?.id!),
        tap((address: string) =>
          this.store.dispatch(getFollowedSpaceIds({ payload: { address } }))
        ),
        tap((address: string) =>
          this.store.dispatch(getFollowedAccountIds({ payload: { address } }))
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((_) => null);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
