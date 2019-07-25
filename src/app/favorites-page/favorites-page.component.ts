import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
//в разработке
@Component({
  selector: "app-favorites-page",
  templateUrl: "./favorites-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./favorites-page.component.css"]
})
export class FavoritesPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    
  }
}
