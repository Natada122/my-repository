import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { DataService } from "../data.service";
import { Search } from "../Search";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list-of-results",
  templateUrl: "./list-of-results.component.html",
  styleUrls: ["./list-of-results.component.css"]
})
export class ListOfResultsComponent implements OnInit, OnDestroy {
  @Input()
  curSearch: Search;
  curPage: number = 1;
  private querySubscription: Subscription;
  constructor(
    private dateService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.curSearch = this.dateService
          .getSearch()
          .find(value => queryParam["location"] == value.location);
      }
    );
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
  load() {
    this.curPage++;
    this.dateService
      .getData(this.curSearch.location, this.curPage)
      .subscribe(
        data => (this.curSearch.listings = this.curSearch.listings.concat(data))
      );
  }
  trackById(index, item) {
    return item.id;
  }
}
