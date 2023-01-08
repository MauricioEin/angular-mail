import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[] | null = [];
  @Output() removed = new EventEmitter<string>()
  @Output() edited = new EventEmitter<string>()
  constructor() {}

  ngOnInit(): void {}
  removeItem(itemId: string) {
    console.log('ItemList Emitting removed to Parent');
    this.removed.emit(itemId)
  }
  editItem(itemId: string) {
    console.log('ItemList Emitting edited to Parent');
    this.edited.emit(itemId)
  }
}
