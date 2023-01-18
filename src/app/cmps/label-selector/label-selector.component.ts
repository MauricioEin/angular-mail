import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OutletContext } from '@angular/router';
import { Label } from 'src/app/models/label';

@Component({
  selector: 'label-selector',
  templateUrl: './label-selector.component.html',
  styleUrls: ['./label-selector.component.scss']
})
export class LabelSelectorComponent {
  @Input() labels!: Label[]
  @Input() emailLabels!: string[]
  @Output() update = new EventEmitter<string[]>()
  selectionMap: any = {}

  ngOnInit() {
    this.labels.forEach(label => {
      this.selectionMap[label._id!] = this.emailLabels.includes(label._id!)
    })
  }

  updateLabels() {
    const selectedLabels = []
    for (let label in this.selectionMap) {
      if (this.selectionMap[label]) selectedLabels.push(label)
    }
    this.update.emit(selectedLabels)

  }
}
