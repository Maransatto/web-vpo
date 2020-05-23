import { Observable, BehaviorSubject } from 'rxjs';

export class Store<T> {
  state$: Observable<T>;
  private _state$: BehaviorSubject<T>;

  protected constructor(
    private initialState: T,
    private localStorageRef: string
  ) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state(): T {
    return this._state$.getValue();
  }

  setState(nextState: T): void {
    this._state$.next(nextState);
    this.save();
  }

  async load(): Promise<T> {
    const state = await JSON.parse(localStorage.getItem(this.localStorageRef));
    console.log('loaded -> ', this.localStorageRef, ' state', state);

    if (state) {
      this.setState(state as T);
      return state;
    } else {
      return this.state;
    }
  }

  save() {
    localStorage.setItem(this.localStorageRef, JSON.stringify(this.state));
  }

  clear() {
    localStorage.removeItem(this.localStorageRef);
    this._state$.next({} as T);
  }
}
