import { initialSerialsState, ISerialState } from "../state/Serial.state";
import { SerialsActions, ESerialActions } from "../actions/Serial.action";

export const SerialReducers = (
  state = initialSerialsState,
  action: SerialsActions
): ISerialState => {
  switch (action.type) {
    case ESerialActions.getSerialsSuccess: {
      return { ...state, serials: action.payload };
    }
    case ESerialActions.getSerialSuccess: {
      return {
        ...state,
        selectedSerial: action.payload
      };
    }
    default:
      return state;
  }
};
