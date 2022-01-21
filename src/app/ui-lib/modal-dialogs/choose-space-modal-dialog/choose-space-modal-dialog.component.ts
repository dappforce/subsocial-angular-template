import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpaceListItemData } from '../../../core/models/space/space-list-item.model';
import { SpaceService } from '../../../space/services/space.service';

export type ChooseSpaceModalData = {
  ids: string[];
};

@Component({
  selector: 'app-choose-space-modal-dialog',
  templateUrl: './choose-space-modal-dialog.component.html',
  styleUrls: ['./choose-space-modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseSpaceModalDialogComponent implements OnInit {
  spaces: SpaceListItemData[];

  constructor(
    public dialogRef: MatDialogRef<ChooseSpaceModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChooseSpaceModalData,
    private spaceService: SpaceService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.spaces = await this.spaceService.getOrLoadSpacesByIds(this.data.ids);
    this.cd.markForCheck();
  }

  onClick(id: string) {
    this.dialogRef.close(id);
  }
}
