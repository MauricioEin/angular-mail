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
  @Output() update = new EventEmitter<string[] | null>()
  selectionMap: any = {}

  ngOnInit() {
    this.labels.forEach(label => {
      this.selectionMap[label._id!] = this.emailLabels.includes(label._id!)
    })
    window.addEventListener('click', this.closeSelector)

  }
  ngOnDestroy() {
    window.removeEventListener('click', this.closeSelector)

  }
  closeSelector = (event: MouseEvent) => {
    const target = event.target as HTMLImageElement
    if (target.name !== 'label-trigger')
      this.update.emit()
  }

  updateLabels() {
    const selectedLabels = []
    for (let label in this.selectionMap) {
      if (this.selectionMap[label]) selectedLabels.push(label)
    }
    this.update.emit(selectedLabels)

  }
}
