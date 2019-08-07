import { Component, OnInit } from "@angular/core";
import { IAppState } from "../Store/state/app.state";
import { Store, select } from "@ngrx/store";
import { GetSerials } from "../Store/actions/serial.action";
import { selectSerialList } from "../Store/selectors/serial.selector";
import { Router } from "@angular/router";
import { SetSearch, GetSearch } from "../Store/actions/search.action";
import { selectCurSearch } from "../Store/selectors/search.selector";
import { ChangeDetectionStrategy } from "@angular/compiler/src/core";

@Component({
  selector: "app-search-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchContainerComponent implements OnInit {
  public serials$ = this.store.pipe(select(selectSerialList));
  public search$ = this.store.pipe(select(selectCurSearch));

  public onSelect(value: string) {
    this.router.navigateByUrl(`search/${value}`);
  }

  public onSearch(value: string) {
    this.store.dispatch(new GetSerials(value));
    this.store.dispatch(new SetSearch(value));
  }
  constructor(private store: Store<IAppState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new GetSearch());
  }
}
