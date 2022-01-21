import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { from } from 'rxjs';
import {
  ConnectionModalData,
  FollowersModalData,
} from '../../../core/types/dialog-modal-data.types';
import { SpaceService } from '../../../space/services/space.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-followers-modal-dialog',
  templateUrl: './followers-modal-dialog.component.html',
  styleUrls: ['./followers-modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowersModalDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FollowersModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FollowersModalData,
    private spaceService: SpaceService,
    private cd: ChangeDetectorRef
  ) {}

  followersIds: string[] = [];

  ngOnInit(): void {
    from(this.spaceService.getFollowersIdsBySpaceId(this.data.spaceId))
      .pipe(take(1))
      .subscribe((ids) => {
        this.followersIds = ids;
        this.cd.markForCheck();
      });
  }
}
