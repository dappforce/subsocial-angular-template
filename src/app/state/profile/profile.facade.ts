import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import { Observable } from 'rxjs';
import { Profile } from './profile.state';
import { loadProfileById, loadProfilesByIds } from './profile.actions';
import { selectProfileById, selectProfilesByIds } from './profile.selectors';
import { takeValueOnce } from '../../core/rxjs-custom/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {
  constructor(private store: Store<AppState>) {}

  loadProfile(id: string) {
    this.store.dispatch(loadProfileById({ id }));
  }

  loadProfiles(ids: string[], type?: 'public' | 'all') {
    this.store.dispatch(loadProfilesByIds({ payload: { ids, type } }));
  }

  getProfile(id: string): Observable<Profile | undefined> {
    return this.store.select(selectProfileById(id));
  }

  getProfileOnce(id: string): Observable<Profile> {
    return this.getProfile(id).pipe(takeValueOnce) as Observable<Profile>
  }

  getProfiles(ids: string[]): Observable<Profile[]> {
    return this.store.select(selectProfilesByIds(ids));
  }

  getMyProfile() {}
}
