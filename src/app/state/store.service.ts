import { Injectable } from '@angular/core';
import { ActionCreator, Store } from '@ngrx/store';
import { AppState } from './state';
import { Actions, ofType } from '@ngrx/effects';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store<AppState>, private action$: Actions) {}

  public async getValueFromStore(
    selector: Function,
    action: ActionCreator,
    getProps: any
  ) {
    return await this.action$
      .pipe(
        ofType(action),
        mergeMap((_) => this.store.select(selector(getProps))),
        take(1)
      )
      .toPromise();
  }

  public async getOrLoadEntities(
    selector: Function,
    loadAction: Function,
    successAction: ActionCreator,
    getProps: any,
    loadProps: any
  ) {
    const entitiesFromStore = await this.store
      .select(selector(getProps))
      .pipe(take(1))
      .toPromise();

    if (!entitiesFromStore || entitiesFromStore?.length === 0) {
      this.store.dispatch(loadAction(loadProps));

      return await this.getValueFromStore(selector, successAction, getProps);
    }

    return entitiesFromStore;
  }
}
