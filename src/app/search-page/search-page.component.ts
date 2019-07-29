import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from "@angular/core";
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
  MESSAGE_ERROR_NULL_PROPERTIES,
  MESSAGE_SELECT_LOCATION,
  PLACE_SEARCH
} from "../constants";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent implements OnInit {
  public searchValue: string;
  public lastSearches: Search[];
  public lastLocations: Place[];
  public message: string = MESSAGE_SEARCH;
  public errorState: boolean = false;
  public inputState: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.lastSearches = this.dataService.getSearch();
  }
  public search(location: string, typeSearch: string): void {
    this.message = "Searhing";
    this.dataService
      .getData(location, typeSearch)
      .pipe(finalize(() => this.cdr.markForCheck()))
      .subscribe(
        ({ listings, totalResult, statusCode }) => {
          if (listings.length) {
            this.lastSearches.push(
              new Search(
                location,
                Date.now(),
                listings,
                typeSearch,
                totalResult
              )
            );
            this.lastSearches.sort(sortByField("date"));
            this.dataService.setSearch(this.lastSearches);
            this.router.navigateByUrl(
              `/results?location=${this.lastSearches[0].location}`
            );
          } else {
            if (statusCode === "200") {
              this.dataService
                .getLocations(location)
                .pipe(finalize(() => this.cdr.markForCheck()))
                .subscribe(locations => {
                  this.inputState = true;
                  this.lastLocations = locations;
                  this.message = MESSAGE_SELECT_LOCATION;
                  if (!this.lastLocations.length) {
                    this.message = MESSAGE_ERROR_NULL_LOCATION;
                    this.errorState = true;
                  }
                });
            } else {
              this.message = MESSAGE_ERROR_NULL_PROPERTIES;
              this.errorState = true;
            }
          }
        },
        () => {
          this.message = MESSAGE_ERROR_TIMEOUT;
          this.errorState = true;
        }
      );
  }

  public searchPoints(): void {
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
  public selectLocation(location: Place): void {
    this.searchValue = location.title;
    this.search(location.placeName, PLACE_SEARCH);
  }
  public refreshSearch(search: Search): void {
    search.date = Date.now();
    this.lastSearches.sort(sortByField("date"));
    this.dataService.setSearch(this.lastSearches);
  }
  public trackByDate(item: Search): number {
    return item.date;
  }
  public trackById(item: Place): string {
    return item.id;
  }
}
