"use client";

import { useEffect, useRef } from "react";
import { Heart, MessageCircle, UserPlus, Bell, AtSign, Briefcase } from "lucide-react";
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from "@/hooks/useNotifications";
import { useNotificationsStore } from "@/stores/useNotificationsStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Notification, NotificationType } from "@/types/models/notification";
import Image from "next/image";

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

const typeIcon: Record<NotificationType, React.ReactNode> = {
  like: <Heart size={14} className="text-error" />,
  comment: <MessageCircle size={14} className="text-primary" />,
  follow: <UserPlus size={14} className="text-success" />,
  mention: <AtSign size={14} className="text-warning" />,
  opportunity: <Briefcase size={14} className="text-info" />,
  system: <Bell size={14} className="text-muted-foreground" />,
};

function NotificationItem({ notification }: { notification: Notification }) {
  const markAsRead = useMarkNotificationAsRead();

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead.mutate({ id: notification.id });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left ${
        !notification.isRead ? "bg-primary/5" : ""
      }`}
    >
      <div className="relative flex-shrink-0">
        {notification.actor?.avatar ? (
          <Image
            src={notification.actor.avatar}
            alt={notification.actor.name}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
            {notification.actor?.name?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}
        <span className="absolute -bottom-0.5 -right-0.5 bg-background rounded-full p-0.5">
          {typeIcon[notification.type]}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug line-clamp-2">
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>

      {!notification.isRead && (
        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-1.5" />
      )}
    </button>
  );
}

export function NotificationDropdown() {
  const { isOpen, close } = useNotificationsStore();
  const { user } = useAuthStore();
  const { data, isLoading } = useNotifications();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const notifications = data?.notifications ?? [];
  const hasUnread = notifications.some((n) => !n.isRead);

  const handleMarkAllRead = () => {
    if (!user?.id) return;
    markAllAsRead.mutate({ userId: user.id });
  };

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="font-semibold text-foreground text-sm">Notifications</span>
        {hasUnread && (
          <button
            onClick={handleMarkAllRead}
            disabled={markAllAsRead.isPending}
            className="text-xs text-primary hover:underline disabled:opacity-50"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-border">
        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <span className="text-sm text-muted-foreground">Loading…</span>
          </div>
        )}

        {!isLoading && notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <Bell size={28} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">No notifications yet</span>
          </div>
        )}

        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
