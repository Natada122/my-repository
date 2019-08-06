import { Action } from "@ngrx/store";

export enum ESearchActions {
  getSearch = "[Search] get Search",
  getSearchSuccess = "[Search] get Search Success",
  setSearch = "[Search] set Search",
  setSearchSuccess = "[Search] set Search Success"
}
export class getSearch implements Action {
  public readonly type = ESearchActions.getSearch;
}
export class setSearch implements Action {
  public readonly type = ESearchActions.setSearch;
  constructor(public payload: string) {}
}
export class getSearchSuccess implements Action {
  public readonly type = ESearchActions.getSearchSuccess;
  constructor(public payload: string) {}
}
export class setSearchSuccess implements Action {
  public readonly type = ESearchActions.setSearchSuccess;
  constructor(public payload: string) {}
}
export type SearchActions =
  | getSearchSuccess
  | getSearch
  | setSearch
  | setSearchSuccess;
