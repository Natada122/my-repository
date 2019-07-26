import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { DataService } from "../services/data.service";
import { Search } from "../Search";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Subject } from "rxjs";
import { QUERY_PARAM_LOCATION } from "../constants";
import { takeUntil } from "rxjs/operators";

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
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}
  private destroy: Subject<boolean> = new Subject<boolean>();
  public ngOnInit() {
    this.querySubscription = this.route.queryParams
      .pipe(takeUntil(this.destroy))
      .subscribe((queryParam: any) => {
        this.lastSearches = this.dateService.getSearch();
        this.curSearchIndex = this.lastSearches.findIndex(
          value => queryParam[QUERY_PARAM_LOCATION] == value.location
        );
      });
  }
  public ngOnDestroy() {
    this.dateService.setSearch(this.lastSearches);
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
  public load() {
    this.lastSearches[this.curSearchIndex].curPage++;
    this.dateService
      .getData(
        this.lastSearches[this.curSearchIndex].location,
        this.lastSearches[this.curSearchIndex].type,
        this.lastSearches[this.curSearchIndex].curPage
      )
      .pipe(takeUntil(this.destroy))
      .subscribe(({ listings }) => {
        this.lastSearches[this.curSearchIndex].listings = this.lastSearches[
          this.curSearchIndex
        ].listings.concat(listings);
        this.cdr.detectChanges();
      });
  }
  public trackById(index, item) {
    return item.id;
  }
  public get curSearch() {
    return this.lastSearches[this.curSearchIndex];
  }
}
