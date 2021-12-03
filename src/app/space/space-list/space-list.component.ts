import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { SpaceListItemData } from '../../core/models/space/space-list-item.model';

import { Store } from '@ngrx/store';
import { AppState } from '../../state/state';

import { selectSpacesByIds } from '../../state/space/space.selectors';
import { isPlatformBrowser } from '@angular/common';
import {
  getSpacesByIds,
  loadSpaceSuccess,
} from '../../state/space/space.actions';
import { BaseInfinityScrollComponent } from '../../core/base-component/base-infinity-scroll.component';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-space-list',
  templateUrl: './space-list.component.html',
  styleUrls: ['./space-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceListComponent
  extends BaseInfinityScrollComponent<SpaceListItemData>
  implements OnInit
{
  constructor(
    public store: Store<AppState>,
    public cd: ChangeDetectorRef,
    public action$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super(store, cd, action$);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getScrollableData(
        getSpacesByIds,
        selectSpacesByIds,
        loadSpaceSuccess
      );
    }
  }
}
