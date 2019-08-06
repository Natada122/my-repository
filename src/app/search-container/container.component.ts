import { Component, OnInit } from "@angular/core";
import { IAppState } from "../Store/state/app.state";
import { Store, select } from "@ngrx/store";
import { getSerials, getSerial } from "../Store/actions/Serial.action";
import { selectSerialList } from "../Store/selectors/Serial.selector";
import { Router } from "@angular/router";
import { setSearch, getSearch } from "../Store/actions/Search.action";
import { selectCurSearch } from "../Store/selectors/Search.selector";

@Component({
  selector: "app-search-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"]
})
export class SearchContainerComponent implements OnInit {
  public serials = this.store.pipe(select(selectSerialList));
  public search = this.store.pipe(select(selectCurSearch));
  public onSelect(value: string) {
    this.router.navigateByUrl(`search/${value}`);
  }
  public onSearch(value: string) {
    this.store.dispatch(new getSerials(value));
    this.store.dispatch(new setSearch(value));
  }
  constructor(private store: Store<IAppState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new getSearch());
  }
}
