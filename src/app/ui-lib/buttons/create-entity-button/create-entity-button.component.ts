import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { DeviceService } from '../../../shared/services/device.service';
import { SpaceService } from '../../../space/services/space.service';
import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'app-create-entity-button',
  templateUrl: './create-entity-button.component.html',
  styleUrls: ['./create-entity-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEntityButtonComponent implements OnInit {
  type: 'space' | 'post' | null = null;

  subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private deviceService: DeviceService,
    private spaceService: SpaceService,
    private cd: ChangeDetectorRef,
    private account: AccountService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.spaceService.myOwnSpaceIds$,
        this.account.currentAccount$,
      ]).subscribe(([ids, account]) => {
        if (account) {
          this.type = ids && ids.length > 0 ? 'post' : 'space';
        } else {
          this.type = null;
        }
        this.cd.markForCheck();
      })
    );
  }

  async onClick() {
    await this.navigate();
  }

  private async navigate() {
    if (this.type === 'post') {
      await this.router.navigate(['/posts', 'new']);
    } else {
      await this.router.navigate(['/spaces', 'new']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
