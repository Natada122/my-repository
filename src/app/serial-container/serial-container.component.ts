import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "../Store/state/app.state";
import { ActivatedRoute } from "@angular/router";
import { selectSelectedSerial } from "../Store/selectors/Serial.selector";
import { getSerial } from "../Store/actions/Serial.action";

@Component({
  selector: "app-serial-container",
  templateUrl: "./serial-container.component.html",
  styleUrls: ["./serial-container.component.css"]
})
export class SerialContainerComponent implements OnInit {
  public serial = this.store.pipe(select(selectSelectedSerial));
  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(new getSerial(this.route.snapshot.params.id));
  }
}
