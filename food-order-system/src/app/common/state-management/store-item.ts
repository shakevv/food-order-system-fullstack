import { BehaviorSubject, Observable } from 'rxjs';

export class StoreItem<T> {
  private state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this.state$ = new BehaviorSubject(initialState);
  }

  protected setValue(newValue: T): void {
    this.state$.next(newValue);
  }

  protected get value$(): Observable<T> {
    return this.state$.asObservable();
  }

  protected get value(): T {
    return this.state$.value;
  }
}
