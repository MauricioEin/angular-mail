
export interface Email{
  _id?:string,
  tabs?:Array<string>,
  name?:string,
  subject:string,
  body:string,
  isRead?:boolean,
  savedAt?:number,
  from?:string,
  to:string,
  labels?:Array<string>
}


export interface selectedEmail{
  checked:boolean,
  email:Email
}


