import { ISearchState, initialSearchState } from "../state/search.state";
import { ESearchActions, SearchActions } from "../actions/Search.action";

export const SearchReducers = (
  state: ISearchState = initialSearchState,
  action: SearchActions
): ISearchState => {
  switch (action.type) {
    case ESearchActions.getSearchSuccess: {
      return {
        ...state,
        searchValue: action.payload
      };
    }
    case ESearchActions.setSearchSuccess: {
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
