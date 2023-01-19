import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Label } from 'src/app/models/label';

@Component({
  selector: 'folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent {
  @Output() compose = new EventEmitter<null>()
  @Output() saveLabel = new EventEmitter<Label>()
  @Output() removeLabel = new EventEmitter<string>()
  @Input() labels!: Label[] | null
  folders = [
    { name: 'inbox' },
    { name: 'starred' },
    { name: 'important' },
    { name: 'sent' },
    { name: 'drafts' },
    { name: 'spam' },
    { name: 'trash' },
  ]
  isLabelEdit = false
  labelToEdit: Label | null = null

  closeLabelEdit() {
    this.isLabelEdit = false
    this.labelToEdit = null
  }
}
