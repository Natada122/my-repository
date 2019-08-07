import { initialSerialsState, ISerialState } from "../state/serial.state";
import { SerialsActions, ESerialActions } from "../actions/serial.action";

export const SerialReducers = (
  state = initialSerialsState,
  action: SerialsActions
): ISerialState => {
  switch (action.type) {
    case ESerialActions.GetSerialsSuccess: {
      return { ...state, serials: action.payload };
    }
    case ESerialActions.GetSerialSuccess: {
      return {
        ...state,
        selectedSerial: action.payload
      };
    }
    default:
      return state;
  }
};
