import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'label-edit',
  templateUrl: './label-edit.component.html',
  styleUrls: ['./label-edit.component.scss']
})
export class LabelEditComponent {
  @Output() close = new EventEmitter<void>() 

  labelName = ''
  isAddLabel = true
  createLabel() {
    // eventBus.emit('createLabel', this.labelName)
    this.isAddLabel = false
  }
  // getMailSvg(iconName) {
  //   return svgService.getMailSvg(iconName)
  // },
}

