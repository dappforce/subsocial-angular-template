import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DeviceService } from '../../../shared/services/device.service';
import { SpaceService } from '../../../space/services/space.service';

@Component({
  selector: 'app-create-entity-button',
  templateUrl: './create-entity-button.component.html',
  styleUrls: ['./create-entity-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEntityButtonComponent implements OnInit {
  type: 'space' | 'post' | null = null;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private deviceService: DeviceService,
    private spaceService: SpaceService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.spaceService.myOwnSpaceIds$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((ids) => {
        console.log(ids);
        this.type = ids && ids.length > 0 ? 'post' : 'space';
        this.cd.markForCheck();
      });
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
