import { Action } from "@ngrx/store";
export enum ESerialActions {
  GetSerials = "[Serial] get Serials",
  GetSerialsSuccess = "[Serial] get Serials Success",
  GetSerial = "[Serial] get Serial",
  GetSerialSuccess = "[Serial] get Serial Success"
}
export class GetSerials implements Action {
  public readonly type = ESerialActions.GetSerials;
  constructor(public payload: string) {}
}
export class GetSerialsSuccess implements Action {
  public readonly type = ESerialActions.GetSerialsSuccess;
  constructor(public payload: ISerial[]) {}
}
export class GetSerial implements Action {
  public readonly type = ESerialActions.GetSerial;
  constructor(public payload: number) {}
}
export class GetSerialSuccess implements Action {
  public readonly type = ESerialActions.GetSerialSuccess;
  constructor(public payload: ISerial) {}
}
export type SerialsActions =
  | GetSerial
  | GetSerialSuccess
  | GetSerials
  | GetSerialsSuccess;
