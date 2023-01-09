// TODO: Add Price

// export interface Email {
//   body: string,
//   from: string,
//   id: string,
//   isDraft: boolean,
//   isImportant: boolean,
//   isRead: boolean,
//   isScheduled: boolean,
//   isSnoozed: boolean,
//   isSpam: boolean,
//   isStarred: boolean,
//   isTrash: boolean,
//   sentAt: number,
//   subject: string,
//   to: string
// }

export interface Email{
  _id:string,
  tab:Array<string>,
  name:string,
  subject:string,
  body:string,
  isRead:boolean,
  sentAt:number,
  from:string,
  to:string,
  labels:Array<string>
}
