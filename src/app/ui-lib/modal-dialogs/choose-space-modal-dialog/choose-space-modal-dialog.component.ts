import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpaceService } from '../../../space/services/space.service';
import { SpaceFacade } from '../../../state/space/space.facade';
import { Observable } from 'rxjs';
import { Space } from '../../../state/space/space.state';

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
  spaces$: Observable<Space[]>;

  constructor(
    public dialogRef: MatDialogRef<ChooseSpaceModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChooseSpaceModalData,
    private spaceService: SpaceService,
    private spaceFacade: SpaceFacade
  ) {}

  async ngOnInit() {
    this.spaces$ = this.spaceFacade.fetchSpaces(this.data.ids);
  }

  onClick(id: string) {
    this.dialogRef.close(id);
  }
}
