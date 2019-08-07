import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-serial-detail",
  templateUrl: "./serial-detail.component.html",
  styleUrls: ["./serial-detail.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SerialDetailComponent {
  @Input()
  public serial: ISerial;
  constructor() {}
}
