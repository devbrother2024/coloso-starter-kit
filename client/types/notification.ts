export interface TypeNotification {
  message: string;
  type: string;
}

export interface TypeNotifications {
  [timestamp: number]: TypeNotification;
}
