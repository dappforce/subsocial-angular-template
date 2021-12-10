import { Injectable } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
} from 'rxjs/operators';
import { MODAL_CONFIG } from '../../core/constants/size.const';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  public isMobile$: Observable<boolean>;

  modalConfig = {
    mobile: {
      width: '95%',
      maxWidth: 'none',
    },
    desktop: {
      width: '500px',
      maxWidth: '80vh',
    },
  };

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

  getResponsiveModalData() {
    return this.isMobile$.pipe(
      concatMap((isMobile) => {
        return isMobile ? of(MODAL_CONFIG.MOBILE) : of(MODAL_CONFIG.DESKTOP);
      })
    );
  }
}
