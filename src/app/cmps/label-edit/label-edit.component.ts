import { Component, EventEmitter, Output } from '@angular/core';
import { Label } from 'src/app/models/label';

@Component({
  selector: 'label-edit',
  templateUrl: './label-edit.component.html',
  styleUrls: ['./label-edit.component.scss']
})
export class LabelEditComponent {
  @Output() close = new EventEmitter<void>() 
  @Output() save= new EventEmitter<Label>()

  labelName = ''
  saveLabel() {
    this.save.emit({name:this.labelName})
  }
  // getMailSvg(iconName) {
  //   return svgService.getMailSvg(iconName)
  // },
}

