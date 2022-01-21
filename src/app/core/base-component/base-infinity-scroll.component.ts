import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { ScrollProps } from '../classes/scroll-props.class';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HasId } from '@subsocial/api/flat-subsocial/flatteners';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseInfinityScrollComponent<T extends HasId> implements OnDestroy {
  @Input() ids: string[] | null;
  @Input() type: 'public' | 'all' = 'public';
  @Input() showHiddenContent: boolean | null;

  public items$: Observable<T[]>;
  public scrollDistance = 1;
  public scrollProps = new ScrollProps(20);
  public isBlockInfinityScroll = false;
  public isLoading: boolean;

  private idsSet = new Set<string>();

  private scrollDownEventSource = new BehaviorSubject<ScrollProps>(
    this.scrollProps
  );

  scrollDownEvent$ = this.scrollDownEventSource.asObservable();

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public store: Store<AppState>,
    public cd: ChangeDetectorRef,
    public action$: Actions
  ) {}

  onScrollDown() {
    if (!this.isBlockInfinityScroll) {
      this.scrollProps.next();
      this.scrollDownEventSource.next(this.scrollProps);
    }
  }

  getScrollableData(dispatchAction: Function, selector: Function) {
    if (!this.ids || this.ids?.length === 0) {
      return;
    }

    this.scrollProps.max = this.ids.length;

    this.items$ = this.scrollDownEvent$.pipe(
      filter((props) => !props.isFinish),
      tap((_) => this.loadStart()),
      map((props) => this.sliceIds(this.ids!, props)),
      tap((slicedIds) =>
        this.store.dispatch(
          dispatchAction({ payload: { ids: slicedIds, type: this.type } })
        )
      ),
      map((ids) => this.getUniqueIds(ids)),
      switchMap((ids) => this.store.select(selector(ids)).pipe(delay(300))),
      filter((items) => items.length > 0),
      tap((_) => this.loadFinish())
    );
  }

  getUniqueIds(ids: string[]) {
    ids.forEach((id) => this.idsSet.add(id));
    return Array.from(this.idsSet);
  }

  trackById(index: number, item: T) {
    return item.id;
  }

  private sliceIds(arr: Array<string>, props: ScrollProps): string[] {
    return arr.slice(props.startIndex, props.endIndex).map((e) => e.toString());
  }

  private loadStart() {
    this.isLoading = true;
    this.isBlockInfinityScroll = true;
    this.cd.markForCheck();
  }

  private loadFinish() {
    this.isLoading = false;
    this.isBlockInfinityScroll = false;
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.next();
    this.unsubscribe$?.complete();
  }
}
