import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Label } from 'src/app/models/label';

@Component({
  selector: 'label-edit',
  templateUrl: './label-edit.component.html',
  styleUrls: ['./label-edit.component.scss']
})
export class LabelEditComponent {
  @Input() label!: Label | null
  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<Label>()

  labelName = ''

  ngOnInit() {
    if (this.label) this.labelName = this.label.name
  }

  saveLabel() {
    this.save.emit({ ...(this.label || {}), name: this.labelName })
  }
  // getMailSvg(iconName) {
  //   return svgService.getMailSvg(iconName)
  // },
}

