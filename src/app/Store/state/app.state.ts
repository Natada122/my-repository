import { ISerialState } from "./Serial.state";
import { initialSerialsState } from "./Serial.state";
import { ISearchState, initialSearchState } from './search.state';
export interface IAppState {
  serials: ISerialState,
  search:ISearchState,
}
export const initialAppState: IAppState = {
  serials: initialSerialsState,
  search:initialSearchState,
};
export function getInitialState(): IAppState {
  return initialAppState;
}
