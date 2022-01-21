import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { BaseControlValueAccessorComponent } from '../../../core/base-component/base-value-accessor';
import { SpaceService } from '../../../space/services/space.service';
import { from, Observable, Subject } from 'rxjs';
import { SpaceListItemData } from '../../../core/models/space/space-list-item.model';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SpaceFacade } from '../../../state/space/space.facade';
import { Space } from '../../../state/space/space.state';

@Component({
  selector: 'app-space-select',
  templateUrl: './space-select.component.html',
  styleUrls: ['./space-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpaceSelectComponent),
      multi: true,
    },
  ],
})
export class SpaceSelectComponent
  extends BaseControlValueAccessorComponent
  implements OnInit
{
  @Input() spaceId: string | undefined;
  spaces: Space[];
  selectedSpace: Space;

  isShowSpaceList: boolean;

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (!this.element.nativeElement.contains(event.target)) {
      this.isShowSpaceList = false;
    }
  }

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private spaceService: SpaceService,
    private spaceFacade: SpaceFacade,
    private cd: ChangeDetectorRef,
    private element: ElementRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.spaceService.myOwnSpaceIds$
      .pipe(
        filter((ids) => !!ids),
        switchMap((ids) => this.spaceFacade.fetchSpaces(ids!))
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((spaces) => {
        const space = this.spaceId
          ? spaces.find((space) => space.id === this.spaceId)
          : spaces[0];
        this.selectSpace(space || spaces[0]);
        this.spaces = spaces;
        this.cd.markForCheck();
      });
  }

  selectSpace(space: Space) {
    this.selectedSpace = space;
    this.value = space.id;
    this.isShowSpaceList = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
