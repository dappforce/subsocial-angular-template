import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { DeviceService } from '../../../shared/services/device.service';
import { Subject } from 'rxjs';
import { ConnectionsModalDialogComponent } from '../../../shared/modal-dialogs/connections-modal-dialog/connections-modal-dialog.component';
import { ConnectionModalData } from '../../../core/types/dialog-modal-data.types';
import { AVATAR_SIZE } from '../../../core/constants/size.const';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  @Input() avatarSrc: string | undefined;
  @Input() profileName: string | undefined;
  @Input() type: 'small' | 'medium' = 'small';
  @Input() followingCount = 0;
  @Input() followersCount = 0;
  @Input() profileId = '';
  @Input() link = '';
  @Input() address = '';

  AVATAR_SIZE = AVATAR_SIZE;

  constructor(public dialog: MatDialog, public deviceService: DeviceService) {}

  connectionModalData: ConnectionModalData;
  private modalConfig: MatDialogConfig = {};

  ngOnInit(): void {
    this.deviceService
      .getResponsiveModalData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => (this.modalConfig = { ...data }));
  }

  openConnectionDialog(activeTab: 'followers' | 'following') {
    this.connectionModalData = {
      activeTab,
      address: this.address,
      followerCount: this.followersCount,
      followingCount: this.followingCount,
    };

    this.modalConfig.data = this.connectionModalData;

    this.dialog.open(ConnectionsModalDialogComponent, this.modalConfig);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
