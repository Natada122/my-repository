import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "../Store/state/app.state";
import { ActivatedRoute } from "@angular/router";
import { selectSelectedSerial } from "../Store/selectors/serial.selector";
import { GetSerial } from "../Store/actions/serial.action";

@Component({
  selector: "app-serial-container",
  templateUrl: "./serial-container.component.html",
  styleUrls: ["./serial-container.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SerialContainerComponent implements OnInit {
  public serial$ = this.store.pipe(select(selectSelectedSerial));

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(new GetSerial(this.route.snapshot.params.id));
  }
}
