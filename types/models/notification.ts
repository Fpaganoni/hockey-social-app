import { User } from "./user";

export enum NotificationType {
  LIKE_POST = "LIKE_POST",
  LIKE_COMMENT = "LIKE_COMMENT",
  COMMENT_POST = "COMMENT_POST",
  REPLY_COMMENT = "REPLY_COMMENT",
  FOLLOW_USER = "FOLLOW_USER",
  CLUB_INVITE = "CLUB_INVITE",
  CLUB_ACCEPT = "CLUB_ACCEPT",
}

export interface Notification {
  id: string;
  type: NotificationType;
  isRead: boolean;
  message: string;
  recipientId: string;
  entityId?: string;
  postId?: string;
  actor?: User;
  createdAt: string;
}

export interface NotificationsPage {
  myNotifications: Notification[];
}

export interface UnreadCountResponse {
  unreadNotificationsCount: number;
}

export interface MarkAsReadResponse {
  markNotificationAsRead: Pick<Notification, "id" | "isRead">;
}

export interface MarkAllAsReadResponse {
  markAllNotificationsAsRead: boolean;
}

export type MarkAsReadVariables = { id: string };
export type MarkAllAsReadVariables = { userId: string };
