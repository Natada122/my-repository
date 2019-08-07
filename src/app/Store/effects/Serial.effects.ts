import { Injectable } from "@angular/core";
import {
  GetSerial,
  ESerialActions,
  GetSerialSuccess,
  GetSerials,
  GetSerialsSuccess
} from "../actions/serial.action";
import { of } from "rxjs";
import { switchMap, map, withLatestFrom, catchError } from "rxjs/operators";
import { IAppState } from "../state/app.state";
import { Effect, ofType, Actions, act } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { selectSerialList } from "../selectors/serial.selector";
import { SerialService } from "src/app/services/serial.service";

@Injectable()
export class SerialEffects {
  @Effect()
  GetSerial = this.actions.pipe(
    ofType<GetSerial>(ESerialActions.GetSerial),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectSerialList))),
    switchMap(([id, serials]) => {
      const selected = serials.find(value => value.id == id);
      return of(new GetSerialSuccess(selected));
    })
  );
  @Effect()
  GetSerials = this.actions.pipe(
    ofType<GetSerials>(ESerialActions.GetSerials),
    switchMap(action =>
      this.serialService.getSerials(action.payload).pipe(
        map(data => of(new GetSerialsSuccess(data))),
        catchError(error => of(new GetSerialsSuccess(error)))
      )
    )
  );
  constructor(
    private serialService: SerialService,
    private actions: Actions,
    private store: Store<IAppState>
  ) {}
}
