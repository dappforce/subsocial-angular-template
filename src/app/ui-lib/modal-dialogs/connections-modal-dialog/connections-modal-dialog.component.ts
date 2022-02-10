import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { TabLinkData } from '../../../core/models/tab-link-data.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConnectionModalData } from '../../../core/types/dialog-modal-data.types';
import { from } from 'rxjs';
import { ProfileService } from '../../../account/services/profile.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-connections-modal-dialog',
  templateUrl: './connections-modal-dialog.component.html',
  styleUrls: ['./connections-modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionsModalDialogComponent implements OnInit {
  tabLinks: TabLinkData[] = [
    { tabName: 'following', additionalInfo: this.data.followingCount },
    { tabName: 'followers', additionalInfo: this.data.followerCount },
  ];

  activeTab: TabLinkData = this.tabLinks.find(
    (tab) => tab.tabName === this.data.activeTab
  )!;

  followersIds: string[];
  followingIds: string[];

  constructor(
    private cd: ChangeDetectorRef,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<ConnectionsModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConnectionModalData
  ) {}

  async ngOnInit() {
    this.followersIds = await this.profileService.getFollowersIds(
      this.data.address
    );
    this.followingIds = await this.profileService.getFollowingIds(
      this.data.address
    );
    this.cd.markForCheck();
  }

  onTabClick(activeTab: TabLinkData) {
    this.activeTab = activeTab;
  }
}
