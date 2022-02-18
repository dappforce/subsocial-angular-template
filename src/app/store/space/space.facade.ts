import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import { loadSpaceById, loadSpacesByIds, updateSpace } from './space.actions';
import { selectSpaceById, selectSpacesByIds } from './space.selectors';
import { Observable } from 'rxjs';
import { Space } from './space.state';
import { takeValueOnce } from '../../core/rxjs-custom/operators';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root',
})
export class SpaceFacade {
  constructor(private store: Store<AppState>) {}

  loadSpace(id: string) {
    this.store.dispatch(loadSpaceById({ id }));
  }

  loadSpaces(ids: string[], type?: 'public' | 'all') {
    this.store.dispatch(loadSpacesByIds({ payload: { ids, type } }));
  }

  getSpace(id: string): Observable<Space | undefined> {
    return this.store.select(selectSpaceById(id));
  }

  getSpaces(ids: string[]): Observable<Space[]> {
    return this.store.select(selectSpacesByIds(ids));
  }

  fetchSpaces(ids: string[]): Observable<Space[]> {
    this.loadSpaces(ids);
    return this.getSpacesOnce(ids);
  }

  getSpaceOnce(id: string): Observable<Space | undefined> {
    return this.store.select(selectSpaceById(id)).pipe(takeValueOnce);
  }

  getSpacesOnce(ids: string[]): Observable<Space[]> {
    return this.store.select(selectSpacesByIds(ids)).pipe(takeValueOnce);
  }

  updateSpace(update: Update<Space>) {
    this.store.dispatch(updateSpace({ payload: update }));
  }

  switchVisibility(spaceId: string) {
    this.getSpaceOnce(spaceId).subscribe((space) => {
      const update: Update<Space> = {
        id: spaceId,
        changes: { isHidden: !space?.isHidden },
      };

      this.updateSpace(update);
    });
  }
}
