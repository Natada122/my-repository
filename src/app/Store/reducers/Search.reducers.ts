import { ISearchState, initialSearchState } from "../state/search.state";
import { ESearchActions, SearchActions } from "../actions/search.action";

export const SearchReducers = (
  state: ISearchState = initialSearchState,
  action: SearchActions
): ISearchState => {
  switch (action.type) {
    case ESearchActions.GetSearchSuccess:
    case ESearchActions.SetSearchSuccess: {
      return {
        ...state,
        searchValue: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
