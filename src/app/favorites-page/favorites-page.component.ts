import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-favorites-page",
  templateUrl: "./favorites-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./favorites-page.component.css"]
})
export class FavoritesPageComponent implements OnInit {
  constructor(private dataService: DataService) {
    this.favorites = dataService.getFavorites();
  }
  public favorites: House[];
  public ngOnInit() {}
  public trackById(index, item) {
    return item.id;
  }
}
