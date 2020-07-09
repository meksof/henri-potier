import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-filter',
  template: `<input
    type="text"
    id="search"
    class="form-control"
    placeholder="rechercher un livre par titre"
    (keyup)="firefilterEvent($event)"
  />`,
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent {
  @Output() filterChange: EventEmitter<string> = new EventEmitter();

  firefilterEvent($event) {
    this.filterChange.emit($event.target.value);
  }
}
