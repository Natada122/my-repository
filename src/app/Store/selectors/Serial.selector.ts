import { IAppState } from "../state/app.state";
import { createSelector } from "@ngrx/store";
import { ISerialState } from "../state/serial.state";

const selectSerials = (state: IAppState) => state.serials;
export const selectSerialList = createSelector(
  selectSerials,
  (state: ISerialState) => state.serials
);
export const selectSelectedSerial = createSelector(
  selectSerials,
  (state: ISerialState) => state.selectedSerial
);
