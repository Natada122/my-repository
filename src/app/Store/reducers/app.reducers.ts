import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { SerialReducers } from "./Serial.reducers";
import { SearchReducers } from "./Search.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
  serials: SerialReducers,
  search: SearchReducers
};
