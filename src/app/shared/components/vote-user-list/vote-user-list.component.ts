import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { BaseInfinityScrollComponent } from '../../../core/base-component/base-infinity-scroll.component';
import { UserInfo } from '../../../core/models/user-info.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import {
  loadProfiles,
  upsertProfiles,
} from '../../../state/profile/profile.actions';
import { selectUserInfoByIds } from '../../../state/profile/profile.selectors';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-vote-user-list',
  templateUrl: './vote-user-list.component.html',
  styleUrls: ['./vote-user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoteUserListComponent extends BaseInfinityScrollComponent<UserInfo> {
  constructor(
    public store: Store<AppState>,
    public cd: ChangeDetectorRef,
    public action$: Actions
  ) {
    super(store, cd, action$);
  }

  ngOnInit(): void {
    this.getScrollableData(loadProfiles, selectUserInfoByIds, upsertProfiles);
  }
}
