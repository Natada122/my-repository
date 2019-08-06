import { Action } from "@ngrx/store";
export enum ESerialActions {
  getSerials = "[Serial] get Serials",
  getSerialsSuccess = "[Serial] get Serials Success",
  getSerial = "[Serial] get Serial",
  getSerialSuccess = "[Serial] get Serial Success"
}
export class getSerials implements Action {
  public readonly type = ESerialActions.getSerials;
  constructor(public payload: string) {}
}
export class getSerialsSuccess implements Action {
  public readonly type = ESerialActions.getSerialsSuccess;
  constructor(public payload: ISerial[]) {}
}
export class getSerial implements Action {
  public readonly type = ESerialActions.getSerial;
  constructor(public payload: number) {}
}
export class getSerialSuccess implements Action {
  public readonly type = ESerialActions.getSerialSuccess;
  constructor(public payload: ISerial) {}
}
export type SerialsActions =
  | getSerial
  | getSerialSuccess
  | getSerials
  | getSerialsSuccess;
