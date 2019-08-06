import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-serial-detail",
  templateUrl: "./serial-detail.component.html",
  styleUrls: ["./serial-detail.component.css"]
})
export class SerialDetailComponent implements OnInit {
  @Input()
  public serial: ISerial;
  constructor() {}

  ngOnInit() {}
}
