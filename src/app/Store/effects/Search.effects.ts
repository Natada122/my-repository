import { Effect, Actions, ofType } from "@ngrx/effects";
import {
  SetSearch,
  ESearchActions,
  SetSearchSuccess,
  GetSearch,
  GetSearchSuccess
} from "../actions/search.action";
import { IAppState } from "../state/app.state";
import { switchMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { SEARCH_KEY } from "src/app/constants";

export class SearchEffects {
  @Effect()
  SetSearch = this.actions.pipe(
    ofType<SetSearch>(ESearchActions.SetSearch),
    map(action => action.payload),
    switchMap(data => {
      localStorage.setItem(SEARCH_KEY, data);
      return of(new SetSearchSuccess(data));
    })
  );

  @Effect()
  GetSearch = this.actions.pipe(
    ofType<GetSearch>(ESearchActions.GetSearch),
    switchMap(() => {
      const data = localStorage.getItem(SEARCH_KEY);
      return of(new GetSearchSuccess(data));
    })
  );
  constructor(private store: IAppState, private actions: Actions) {}
}
