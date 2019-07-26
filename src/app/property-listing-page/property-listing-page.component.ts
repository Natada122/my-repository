import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Subject } from "rxjs";
import { DataService } from "../services/data.service";
import {
  QUERY_PARAM_LOCATION,
  QUERY_PARAM_ID,
  FAVORITE_SYMBOL,
  UNFAVORITE_SYMBOL
} from "../constants";
import { takeUntil } from "rxjs/operators";

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
  private id: number;
  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private dateService: DataService
  ) {}
  public ngOnInit() {
    this.favorites = this.dateService.getFavorites();
    this.routeSubscription = this.route.params
      .pipe(takeUntil(this.destroy))
      .subscribe(params => (this.id = params[QUERY_PARAM_ID]));
    this.querySubscription = this.route.queryParams
      .pipe(takeUntil(this.destroy))
      .subscribe((queryParam: any) => {
        let search = this.dateService
          .getSearch()
          .find(value => queryParam[QUERY_PARAM_LOCATION] == value.location);
        if (search) {
          this.house = search.listings.find(value => this.id == value.id);
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
    this.destroy.unsubscribe();
  }
  public onSelect() {
    if (this.isFavorite) {
      this.deleteFavorite();
    } else {
      this.addFavorite();
    }
    this.dateService.setFavorites(this.favorites);
  }
  public addFavorite() {
    this.favSymbol = UNFAVORITE_SYMBOL;
    this.isFavorite = true;
    this.favorites.push(this.house);
  }
  public deleteFavorite() {
    this.favSymbol = FAVORITE_SYMBOL;
    this.isFavorite = false;
    this.favorites.splice(
      this.favorites.findIndex(value => this.house.id == value.id),
      1
    );
  }
}
