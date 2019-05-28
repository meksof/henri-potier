import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-book-filter",
  templateUrl: "./book-filter.component.html",
  styleUrls: ["./book-filter.component.scss"]
})
export class BookFilterComponent {
  @Output() onFilterChange: EventEmitter<string> = new EventEmitter();

  /**
   * Déclencher l'évenement de filtre de recherche
   *
   * @param {*} $event
   * @memberof BookFilterComponent
   */
  firefilterEvent($event) {
    this.onFilterChange.emit($event.target.value);
  }
}
