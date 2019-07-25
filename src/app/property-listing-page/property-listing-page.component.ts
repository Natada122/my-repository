import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { DataService } from "../services/data.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import {
  QUERY_PARAM_LOCATION,
  QUERY_PARAM_ID,
  FAVORITE_SYMBOL,
  UNFAVORITE_SYMBOL
} from "../constants";

@AutoUnsubscribe()
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
    this.routeSubscription = this.route.params.subscribe(
      params => (this.id = params[QUERY_PARAM_ID])
    );
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.house = this.dateService
          .getSearch()
          .find(value => queryParam[QUERY_PARAM_LOCATION] == value.location)
          .listings.find(value => this.id == value.id);
      }
    );
    if (this.favorites.find(value => this.house.id == value.id)) {
      this.isFavorite = true;
      this.favSymbol = UNFAVORITE_SYMBOL;
    }
  }
  public ngOnDestroy() {}
  public onSelect() {
    if (this.isFavorite) {
      this.deleteFavorite();
    } else {
      this.addFavorite();
    }
    this.dateService.setFavorites(this.favorites);
    console.log(this.dateService.getFavorites());
  }
  public addFavorite() {
    this.favSymbol = UNFAVORITE_SYMBOL;
    this.isFavorite = true;
    this.favorites.push(this.house);
  }
  public deleteFavorite() {
    this.favSymbol = FAVORITE_SYMBOL;
    this.isFavorite = false;
    this.favorites.splice(this.favorites.indexOf(this.house), 1);
  }
}
