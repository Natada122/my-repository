import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Search } from "../Search";
import { DataService } from "../services/data.service";
import { sortByField } from "../helpers";
@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent implements OnInit {
  public searchValue: number;
  public lastSearches: Search[];
  constructor(private dataService: DataService) {}

 public ngOnInit() {
    this.lastSearches = this.dataService.getSearch();
  }
  public search(location: string) {
    this.dataService
      .getData(location)
      .subscribe(data =>
        this.lastSearches.push(new Search(location, Date.now(), data))
      );
    this.lastSearches.sort(sortByField("date"));
    this.dataService.setSearch(this.lastSearches);
  }
 public refreshSearch(search: Search) {
    search.date = Date.now();
    this.lastSearches.sort(sortByField("date"));
    this.dataService.setSearch(this.lastSearches);
  }
}
