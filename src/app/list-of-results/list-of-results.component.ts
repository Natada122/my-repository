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
import { Subject } from "rxjs";
import { QUERY_PARAM_LOCATION } from "../constants";
import { takeUntil, finalize } from "rxjs/operators";

@Component({
  selector: "app-list-of-results",
  templateUrl: "./list-of-results.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./list-of-results.component.css"]
})
export class ListOfResultsComponent implements OnInit, OnDestroy {
  public curSearchIndex: number;
  public lastSearches: Search[];
  constructor(
    private dateService: DataService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}
  private destroy: Subject<boolean> = new Subject<boolean>();
  public ngOnInit() {
    this.route.queryParams
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
    this.destroy.complete();
  }
  public load(): void {
    this.curSearch.curPage++;
    let { location, type, curPage } = this.curSearch;
    this.dateService
      .getData(location, type, curPage)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => this.cdr.markForCheck())
      )
      .subscribe(({ listings }) => {
        this.curSearch.listings = this.curSearch.listings.concat(listings);
      });
  }
  public trackById(item: House): number {
    return item.id;
  }
  public get curSearch(): Search {
    return this.lastSearches[this.curSearchIndex];
  }
}
