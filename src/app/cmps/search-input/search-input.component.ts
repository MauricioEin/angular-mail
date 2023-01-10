import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Output() search = new EventEmitter<string>()
  txt = ''
  onInput = () => {
    this.search.emit(this.txt)
  }
}
