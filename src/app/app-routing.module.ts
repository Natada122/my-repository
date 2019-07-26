import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListOfResultsComponent } from "./list-of-results/list-of-results.component";
import { SearchPageComponent } from "./search-page/search-page.component";
import { FavoritesPageComponent } from "./favorites-page/favorites-page.component";
import { PropertyListingPageComponent } from "./property-listing-page/property-listing-page.component";

const routes: Routes = [
  { path: "", component: SearchPageComponent },
  { path: "results", component: ListOfResultsComponent },
  { path: "favorites", component: FavoritesPageComponent },
  { path: "results/:id", component: PropertyListingPageComponent },
  { path: "favorites/:id", component: PropertyListingPageComponent },
  { path: "**", component: SearchPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
