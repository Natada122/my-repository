import { Action } from "@ngrx/store";

export enum ESearchActions {
  GetSearch = "[Search] get Search",
  GetSearchSuccess = "[Search] get Search Success",
  SetSearch = "[Search] set Search",
  SetSearchSuccess = "[Search] set Search Success"
}
export class GetSearch implements Action {
  public readonly type = ESearchActions.GetSearch;
}
export class SetSearch implements Action {
  public readonly type = ESearchActions.SetSearch;
  constructor(public payload: string) {}
}
export class GetSearchSuccess implements Action {
  public readonly type = ESearchActions.GetSearchSuccess;
  constructor(public payload: string) {}
}
export class SetSearchSuccess implements Action {
  public readonly type = ESearchActions.SetSearchSuccess;
  constructor(public payload: string) {}
}
export type SearchActions =
  | GetSearchSuccess
  | GetSearch
  | SetSearch
  | SetSearchSuccess;
