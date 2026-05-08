import { User } from "./user";

export type NotificationType =
  | "like"
  | "comment"
  | "follow"
  | "mention"
  | "opportunity"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  isRead: boolean;
  message: string;
  entityId?: string;
  entityType?: "post" | "comment" | "user" | "opportunity";
  actor?: User;
  userId: string;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
}

export interface UnreadCountResponse {
  unreadNotificationsCount: number;
}

export interface MarkAsReadResponse {
  markNotificationAsRead: Notification;
}

export interface MarkAllAsReadResponse {
  markAllNotificationsAsRead: boolean;
}

export type MarkAsReadVariables = { id: string };
export type MarkAllAsReadVariables = { userId: string };
