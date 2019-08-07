import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-serial-list",
  templateUrl: "./serial-list.component.html",
  styleUrls: ["./serial-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SerialListComponent {
  @Input()
  public serials: ISerial[];
  
  @Output()
  public onSelected = new EventEmitter<number>();
  public onSelect(value: number) {
    this.onSelected.emit(value);
  }
  constructor() {}

  public trackById(index: number, item: ISerial): number {
    return item.id;
  }
}
