import { Effect, Actions, ofType } from "@ngrx/effects";
import {
  setSearch,
  ESearchActions,
  setSearchSuccess
} from "../actions/Search.action";
import { IAppState } from "../state/app.state";
import { switchMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { SEARCH_KEY } from 'src/app/constants';

export class SearchEffects {
  @Effect()
  setSearch = this.actions.pipe(
    ofType<setSearch>(ESearchActions.setSearch),
    map(action => action.payload),
    switchMap(data => {
      localStorage.setItem(SEARCH_KEY, data);
      return of(new setSearchSuccess(data));
    })
  );
  @Effect()
  getSearch = this.actions.pipe(
    ofType<setSearch>(ESearchActions.setSearch),
    switchMap(() => {
      const data = localStorage.getItem(SEARCH_KEY);
      return of(new setSearchSuccess(data));
    })
  );
  constructor(private store: IAppState, private actions: Actions) {}
}
