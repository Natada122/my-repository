import { Injectable } from "@angular/core";
import {
  getSerial,
  ESerialActions,
  getSerialSuccess,
  getSerials,
  getSerialsSuccess
} from "../actions/Serial.action";
import { of } from "rxjs";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { IAppState } from "../state/app.state";
import { Effect, ofType, Actions, act } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { selectSerialList } from "../selectors/Serial.selector";
import { SerialService } from "src/app/services/serial.service";
@Injectable()
export class SerialEffects {
  @Effect()
  getSerial = this.actions.pipe(
    ofType<getSerial>(ESerialActions.getSerial),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectSerialList))),
    switchMap(([id,serials]) => {
const selected=serials.find(value=> value.id==id);
      return of(new getSerialSuccess(selected))})
  );
  @Effect()
  getSerials = this.actions.pipe(
    ofType<getSerials>(ESerialActions.getSerials),
    switchMap(action => this.serialService.getSerials(action.payload)),
    switchMap(data => of(new getSerialsSuccess(data)))
  );
  constructor(
    private serialService: SerialService,
    private actions: Actions,
    private store: Store<IAppState>
  ) {}
}
