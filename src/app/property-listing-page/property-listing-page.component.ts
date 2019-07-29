import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Subject } from "rxjs";
import { DataService } from "../services/data.service";
import {
  QUERY_PARAM_LOCATION,
  QUERY_PARAM_ID,
  FAVORITE_SYMBOL,
  UNFAVORITE_SYMBOL
} from "../constants";
import { takeUntil, zip } from "rxjs/operators";

@Component({
  selector: "app-property-listing-page",
  templateUrl: "./property-listing-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./property-listing-page.component.css"]
})
export class PropertyListingPageComponent implements OnInit, OnDestroy {
  public house: House;
  public favSymbol: string = FAVORITE_SYMBOL;
  public isFavorite: boolean = false;
  public favorites: House[];
  private routeSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private dateService: DataService,
    private url: Location
  ) {}
  public ngOnInit() {
    this.favorites = this.dateService.getFavorites();
    this.routeSubscription = this.route.params
      .pipe(
        takeUntil(this.destroy),
        zip(this.route.queryParams)
      )
      .subscribe(params => {
        let [paramId, paramLocation] = params;
        let search = this.dateService
          .getSearch()
          .find(value => paramLocation[QUERY_PARAM_LOCATION] == value.location);
        if (search) {
          this.house = search.listings.find(
            value => paramId[QUERY_PARAM_ID] == value.id
          );
        }
      });
    if (this.favorites.some(value => this.house.id == value.id)) {
      this.isFavorite = true;
      this.favSymbol = UNFAVORITE_SYMBOL;
    }
  }
  private destroy: Subject<boolean> = new Subject<boolean>();
  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
  public onSelect(): void {
    if (this.isFavorite) {
      this.deleteFavorite();
    } else {
      this.addFavorite();
    }
    this.dateService.setFavorites(this.favorites);
  }
  public addFavorite(): void {
    this.favSymbol = UNFAVORITE_SYMBOL;
    this.isFavorite = true;
    this.favorites.push(this.house);
  }
  public deleteFavorite(): void {
    this.favSymbol = FAVORITE_SYMBOL;
    this.isFavorite = false;
    this.favorites = this.favorites.filter(item => this.house.id == item.id);
  }
  public goBack(): void {
    this.url.back();
  }
}
