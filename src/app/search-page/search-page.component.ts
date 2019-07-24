import { Component, OnInit } from "@angular/core";
import { Search } from "../Search";
import { DataService } from "../data.service";
@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent implements OnInit {
  lastSearches: Search[];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.lastSearches = this.dataService.getSearch();
  }
  search(location: string) {
    this.dataService
      .getData(location)
      .subscribe(data =>
        this.lastSearches.push(new Search(location, Date.now(), data))
      );
    this.sortSearch();
    this.dataService.setSearch(this.lastSearches);
  }
  refreshSearch(search: Search) {
    search.date = Date.now();
    this.sortSearch();
    this.dataService.setSearch(this.lastSearches);
  }
  sortSearch() {
    this.lastSearches.sort((a: Search, b: Search) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
  }
}
