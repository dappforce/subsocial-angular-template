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
import { FollowersModalDialogComponent } from '../../modal-dialogs/followers-modal-dialog/followers-modal-dialog.component';
import { isPlatformBrowser } from '@angular/common';
import { AVATAR_SIZE } from '../../../core/constants/size.const';

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

  AVATAR_SIZE = AVATAR_SIZE;

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
    const data = {
      spaceId: this.spaceId,
    };

    if (isPlatformBrowser(this.platformId)) {
      this.deviceService
        ?.getResponsiveModalData()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (responsiveData) => (this.modalConfig = { ...responsiveData, data })
        );
    }
  }
}
