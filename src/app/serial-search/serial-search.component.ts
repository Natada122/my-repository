import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-serial-search",
  templateUrl: "./serial-search.component.html",
  styleUrls: ["./serial-search.component.css"]
})
export class SerialSearchComponent implements OnInit {
  @Input()
  public searchValue: string;
  @Output()
  public onSelected = new EventEmitter<string>();
  public onSelect(value: string) {
    this.onSelected.emit(value);
  }
  constructor() {}

  ngOnInit() {}
}
