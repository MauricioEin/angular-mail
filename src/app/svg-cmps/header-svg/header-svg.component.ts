import { Component,Input } from '@angular/core';

@Component({
  selector: 'header-svg',
  templateUrl: './header-svg.component.html',
  styleUrls: ['./header-svg.component.scss']
})
export class HeaderSvgComponent {
@Input() icon!:string


}
