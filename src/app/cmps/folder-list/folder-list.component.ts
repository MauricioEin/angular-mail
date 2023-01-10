import { Component } from '@angular/core';

@Component({
  selector: 'folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent {
  folders=[
    {name:'Inbox'},
    {name:'Starred'},
    {name:'Important'},
    {name:'Sent'},
    {name:'Drafts'},
    {name:'Spam'},
    {name:'Trash'},
  ]

  setTab=(folder:string)=>{console.log('setting tab:', folder)}

}
