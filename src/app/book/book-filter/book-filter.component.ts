import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-book-filter",
  templateUrl: "./book-filter.component.html",
  styleUrls: ["./book-filter.component.scss"]
})
export class BookFilterComponent {
  @Output() onFilterChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

  firefilterEvent($event) {
    this.onFilterChange.emit($event.target.value);
  }
}
