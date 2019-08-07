import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { SerialReducers } from "./serial.reducers";
import { SearchReducers } from "./search.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
  serials: SerialReducers,
  search: SearchReducers
};
