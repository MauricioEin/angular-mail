import { Component, Input } from '@angular/core';

@Component({
  selector: 'folder-list-svg',
  templateUrl: './folder-list-svg.component.html',
  styleUrls: ['./folder-list-svg.component.scss']
})
export class FolderListSvgComponent {
  @Input() icon!:string

}
