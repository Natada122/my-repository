import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Search } from "../Search";
import { DataService } from "../services/data.service";
import { sortByField } from "../helpers";
import {
  MESSAGE_SEARCH,
  POINT_SEARCH,
  MESSAGE_ERROR_NULL_LOCATION,
  MESSAGE_ERROR_TIMEOUT,
  MESSAGE_ERROR_DISABLED_LOCATION,
  MESSAGE_ERROR_LOCATION_NOT_FOUND,
  MESSAGE_ERROR_NULL_PROPERTIES
} from "../constants";
import { Router } from "@angular/router";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent implements OnInit {
  public searchValue: number;
  public lastSearches: Search[];
  public message: string = MESSAGE_SEARCH;
  public errorState = false;

  constructor(private dataService: DataService, private router: Router) {}

  public ngOnInit() {
    this.lastSearches = this.dataService.getSearch();
  }
  public search(location: string, typeSearch: string) {
    this.message = "Searhing";
    this.dataService.getData(location, typeSearch).subscribe(
      ({ listings, totalResult, statusCode }) => {
        if (listings.length) {
          this.lastSearches.push(
            new Search(location, Date.now(), listings, typeSearch, totalResult)
          );
          this.lastSearches.sort(sortByField("date"));
          this.dataService.setSearch(this.lastSearches);
          this.router.navigateByUrl(
            `/results?location=${this.lastSearches[0].location}`
          );
        } else {
          if (statusCode === "200") {
            this.message = MESSAGE_ERROR_NULL_LOCATION;
          } else {
            this.message = MESSAGE_ERROR_NULL_PROPERTIES;
          }
          this.errorState = true;
        }
      },
      () => {
        this.message = MESSAGE_ERROR_TIMEOUT;
        this.errorState = true;
      }
    );
  }

  public searchPoints() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.search(
            `${position.coords.latitude},${position.coords.longitude}`,
            POINT_SEARCH
          );
        },
        () => {
          this.message = MESSAGE_ERROR_LOCATION_NOT_FOUND;
          this.errorState = true;
        }
      );
    } else {
      this.message = MESSAGE_ERROR_DISABLED_LOCATION;
      this.errorState = true;
    }
  }
  public refreshSearch(search: Search) {
    search.date = Date.now();
    this.lastSearches.sort(sortByField("date"));
    this.dataService.setSearch(this.lastSearches);
  }
}
