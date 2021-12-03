import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeviceService } from '../../../shared/services/device.service';
import { takeUntil } from 'rxjs/operators';
import { FollowersModalDialogComponent } from '../../../shared/modal-dialogs/followers-modal-dialog/followers-modal-dialog.component';
import { FollowersModalData } from '../../../core/types/dialog-modal-data.types';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-space-info',
  templateUrl: './space-info.component.html',
  styleUrls: ['./space-info.component.scss'],
})
export class SpaceInfoComponent implements OnInit, OnDestroy {
  @Input() link = '';
  @Input() spaceId = '';
  @Input() postsCount = 1;
  @Input() avatarSrc = '';
  @Input() spaceName = '';
  @Input() followersCount = 1;
  @Input() itemType: 'list' | 'single';

  followersModalData: FollowersModalData;

  private unsubscribe$: Subject<void> = new Subject();
  private modalConfig: MatDialogConfig = {};

  constructor(
    public dialog: MatDialog,
    public deviceService: DeviceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.configModalDialog();
  }

  onOpenModal() {
    this.dialog.open(FollowersModalDialogComponent, this.modalConfig);
  }

  ngOnDestroy(): void {
    //check for storybook
    if (typeof this.unsubscribe$ !== 'string') {
      this.unsubscribe$?.next();
      this.unsubscribe$?.complete();
    }
  }

  private configModalDialog() {
    this.followersModalData = {
      spaceId: this.spaceId,
    };
    this.modalConfig.data = this.followersModalData;

    if (isPlatformBrowser(this.platformId)) {
      this.deviceService?.isMobile$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((isMobile) => {
          if (isMobile) {
            this.modalConfig.width = '95%';
            this.modalConfig.maxWidth = 'none';
          } else {
            this.modalConfig.width = '500px';
            this.modalConfig.maxWidth = '80vh';
          }
        });
    }
  }
}
