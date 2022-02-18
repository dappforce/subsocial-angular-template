import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { selectSpacesByIds } from '../../store/space/space.selectors';
import { isPlatformBrowser } from '@angular/common';
import { loadSpacesByIds } from '../../store/space/space.actions';
import { BaseInfinityScrollComponent } from '../../core/base-component/base-infinity-scroll.component';
import { Actions } from '@ngrx/effects';
import { Space } from '../../store/space/space.state';

@Component({
  selector: 'app-space-list',
  templateUrl: './space-list.component.html',
  styleUrls: ['./space-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceListComponent
  extends BaseInfinityScrollComponent<Space>
  implements OnInit
{
  @Input() showHidden: boolean;

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
      this.getScrollableData(loadSpacesByIds, selectSpacesByIds);
    }
  }
}
