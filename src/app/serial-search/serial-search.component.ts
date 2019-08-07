import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-serial-search",
  templateUrl: "./serial-search.component.html",
  styleUrls: ["./serial-search.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SerialSearchComponent {
  @Input()
  public searchValue: string;

  @Output()
  public onSelected = new EventEmitter<string>();
  public onSelect(value: string) {
    this.onSelected.emit(value);
  }
  
  constructor() {}
}
