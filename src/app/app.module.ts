import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ListOfResultsComponent } from './list-of-results/list-of-results.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { PropertyListingPageComponent } from './property-listing-page/property-listing-page.component';

@NgModule({
  declarations: [AppComponent, ListOfResultsComponent, SearchPageComponent, FavoritesPageComponent, PropertyListingPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
