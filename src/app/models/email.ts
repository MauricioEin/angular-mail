// TODO: Add Price

export interface Email {
  body: string,
  from: string,
  id: string,
  isDraft: boolean,
  isImportant: boolean,
  isRead: boolean,
  isScheduled: boolean,
  isSnoozed: boolean,
  isSpam: boolean,
  isStarred: boolean,
  isTrash: boolean,
  sentAt: number,
  subject: string,
  to: string
}
