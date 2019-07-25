import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { DataService } from "../services/data.service";
import { Search } from "../Search";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { QUERY_PARAM_LOCATION } from "../constants";

@AutoUnsubscribe()
@Component({
  selector: "app-list-of-results",
  templateUrl: "./list-of-results.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./list-of-results.component.css"]
})
export class ListOfResultsComponent implements OnInit, OnDestroy {
  public curSearchIndex: number;
  public lastSearches: Search[];
  private querySubscription: Subscription;
  constructor(
    private dateService: DataService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.lastSearches = this.dateService.getSearch();
        this.curSearchIndex = this.lastSearches.findIndex(
          value => queryParam[QUERY_PARAM_LOCATION] == value.location
        );
      }
    );
  }
  public ngOnDestroy() {
    this.dateService.setSearch(this.lastSearches);
  }
  public load() {
    this.lastSearches[this.curSearchIndex].curPage++;
    this.dateService
      .getData(
        this.lastSearches[this.curSearchIndex].location,
        this.lastSearches[this.curSearchIndex].curPage
      )
      .subscribe(
        data =>
          (this.lastSearches[this.curSearchIndex].listings = this.lastSearches[
            this.curSearchIndex
          ].listings.concat(data))
      );
  }
  public trackById(index, item) {
    return item.id;
  }
}
