import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-serial-list",
  templateUrl: "./serial-list.component.html",
  styleUrls: ["./serial-list.component.css"]
})
export class SerialListComponent implements OnInit {
  @Input()
  public serials: ISerial[];
  @Output()
  public onSelected = new EventEmitter<number>();
  public onSelect(value: number) {
    this.onSelected.emit(value);
  }
  constructor() {}

  ngOnInit() {}
}
