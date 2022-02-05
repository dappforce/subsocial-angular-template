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
import { Subject } from 'rxjs';
import { delay, filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SpaceFacade } from '../../../state/space/space.facade';
import { Space } from '../../../state/space/space.state';
import { StorageService } from '../../../shared/services/storage.service';

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
    private element: ElementRef,
    private storage: StorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.spaceService.myOwnSpaceIds$
      .pipe(
        filter((ids) => !!ids),
        switchMap((ids) => this.spaceFacade.fetchSpaces(ids!).pipe(delay(100)))
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((spaces) => {
        let space: Space;

        if (this.spaceId) {
          space =
            spaces.find((space) => space.id === this.spaceId) || spaces[0];
        } else {
          const lastSaveId = this.storage.getLastSpaceId();
          console.log(lastSaveId);
          space = lastSaveId
            ? spaces.find((space) => space.id === lastSaveId) || spaces[0]
            : spaces[0];
        }

        this.selectSpace(space);
        this.spaces = spaces;
        this.cd.markForCheck();
      });
  }

  selectSpace(space: Space) {
    this.selectedSpace = space;
    this.writeValue(space.id);
    this.isShowSpaceList = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
