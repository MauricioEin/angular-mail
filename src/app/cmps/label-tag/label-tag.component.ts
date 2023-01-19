import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Label } from 'src/app/models/label';

@Component({
  selector: 'label-tag',
  templateUrl: './label-tag.component.html',
  styleUrls: ['./label-tag.component.scss']
})
export class LabelTagComponent {
  @Input() label!:Label
  @Output() remove = new EventEmitter<string>()

}
