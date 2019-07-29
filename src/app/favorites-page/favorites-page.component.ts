import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-favorites-page",
  templateUrl: "./favorites-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./favorites-page.component.css"]
})
export class FavoritesPageComponent implements OnInit {
  constructor(private dataService: DataService) {}
  public favorites: House[];
  public ngOnInit() {
    this.favorites = this.dataService.getFavorites();
  }
  public trackById(item: House): number {
    return item.id;
  }
}
