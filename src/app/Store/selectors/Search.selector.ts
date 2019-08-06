import { IAppState } from "../state/app.state";
import { createSelector } from "@ngrx/store";
import { ISearchState } from "../state/search.state";

const selectSearch = (state: IAppState) => state.search;
export const selectCurSearch = createSelector(
  selectSearch,
  (state: ISearchState) => state.searchValue
);
