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
import { ActionCreator, Store } from '@ngrx/store';
import { KeyValuePair } from '../models/key-value-pair.model';
import {
  delay,
  filter,
  map,
  mergeMap,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseInfinityScrollComponent<T extends HasId> implements OnDestroy {
  @Input() ids: string[] | null;
  @Input() type: 'public' | 'all' = 'public';
  public listData: Array<T> = [];
  public listDataIds: Array<string> = [];
  public scrollDistance = 1;
  public scrollProps = new ScrollProps(20);
  public isBlockInfinityScroll = false;

  private scrollDownEventSource = new BehaviorSubject<ScrollProps>(
    this.scrollProps
  );
  public scrollDownEvent$ = this.scrollDownEventSource.asObservable();

  public isLoading: boolean;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public store: Store<AppState>,
    public cd: ChangeDetectorRef,
    public action$: Actions
  ) {}

  onScrollDown() {
    this.scrollEvent();
  }

  scrollEvent() {
    if (!this.isBlockInfinityScroll) {
      this.scrollProps.next();
      this.scrollDownEventSource.next(this.scrollProps);
    }
  }

  getScrollableData(
    dispatchAction: Function,
    selector: Function,
    selectAction: ActionCreator
  ) {
    if (!this.ids) {
      return;
    }

    this.scrollProps.max = this.ids.length;
    const loadData$ = this.scrollDownEvent$.pipe(
      filter((props) => !props.isFinish),
      tap((_) => this.loadStart()),
      map((props) => this.sliceIds(this.ids!, props)),
      tap((ids) =>
        this.store.dispatch(
          dispatchAction({ payload: { ids, type: this.type } })
        )
      )
    );

    this.action$
      .pipe(
        ofType(selectAction),
        withLatestFrom(loadData$),
        mergeMap(([, ids]) =>
          this.store.select(selector(ids)).pipe(take(1), delay(500))
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((items) => this.addUniqueDataToListDataArray(items));
  }

  addUniqueDataToListDataArray(itemDictionary: KeyValuePair<T>) {
    const newListDataIds: string[] = [];
    for (let id in itemDictionary) {
      if (
        itemDictionary.hasOwnProperty(id) &&
        !this.listDataIds?.includes(id)
      ) {
        newListDataIds.push(id);
      }
    }
    const newItems = newListDataIds
      .sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
      .map((id) => itemDictionary[id])
      .filter((post) => post !== undefined);
    this.listData.push(...newItems);
    this.listDataIds.push(...newListDataIds);
    this.loadFinish();
    this.cd.markForCheck();
  }

  private sliceIds(arr: Array<string>, props: ScrollProps): string[] {
    return arr.slice(props.startIndex, props.endIndex).map((e) => e.toString());
  }

  trackById(index: number, item: T) {
    return item.id;
  }

  private loadStart() {
    this.isLoading = true;
    this.isBlockInfinityScroll = true;
  }

  private loadFinish() {
    this.isLoading = false;
    this.isBlockInfinityScroll = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.next();
    this.unsubscribe$?.complete();
  }
}
