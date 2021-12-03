import {
  Component,
  HostListener,
  Inject,
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
    }
  }
}
