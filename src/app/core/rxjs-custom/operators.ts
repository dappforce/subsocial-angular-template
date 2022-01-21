import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export function takeValueOnce<T>(source$: Observable<T>): Observable<T> {
  return source$.pipe(filter(isNotEmptyOrNull), take(1));
}

export const isNotEmptyOrNull = (value: any) => {
  if (typeof value === 'object') {
    return Object.keys(value).length > 0;
  } else if (Array.isArray(value)) {
    return value.length > 0;
  } else {
    return !!value;
  }
};
