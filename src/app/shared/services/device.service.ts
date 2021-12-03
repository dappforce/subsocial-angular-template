import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  public isMobile$: Observable<boolean>;

  constructor() {}

  init() {
    this.isMobile$ = fromEvent<any>(window, 'resize').pipe(
      map((event) => {
        return event.target.innerWidth < 768;
      }),
      startWith(window.innerWidth < 768),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }
}
