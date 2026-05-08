"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import {
  Heart,
  MessageCircle,
  UserPlus,
  Bell,
  AtSign,
  Briefcase,
  CheckCheck,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import {
  useNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from "@/hooks/useNotifications";
import { useNotificationsStore } from "@/stores/useNotificationsStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Notification, NotificationType } from "@/types/models/notification";

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

const TYPE_ICON: Record<NotificationType, React.ReactNode> = {
  [NotificationType.LIKE_POST]: <Heart size={12} className="text-error" />,
  [NotificationType.LIKE_COMMENT]: <Heart size={12} className="text-error" />,
  [NotificationType.COMMENT_POST]: <MessageCircle size={12} className="text-primary" />,
  [NotificationType.REPLY_COMMENT]: <MessageCircle size={12} className="text-primary" />,
  [NotificationType.FOLLOW_USER]: <UserPlus size={12} className="text-success" />,
  [NotificationType.CLUB_INVITE]: <Briefcase size={12} className="text-warning" />,
  [NotificationType.CLUB_ACCEPT]: <CheckCheck size={12} className="text-success" />,
};

function resolveNotificationHref(
  notification: Notification,
  locale: string
): string | null {
  const { type, postId, actor } = notification;

  if (
    type === NotificationType.LIKE_POST ||
    type === NotificationType.COMMENT_POST ||
    type === NotificationType.LIKE_COMMENT ||
    type === NotificationType.REPLY_COMMENT
  ) {
    return postId ? `/${locale}/post/${postId}` : null;
  }

  if (type === NotificationType.FOLLOW_USER) {
    return actor?.username
      ? `/${locale}/profile/${actor.username.replace(/\./g, "/")}`
      : null;
  }

  if (
    type === NotificationType.CLUB_INVITE ||
    type === NotificationType.CLUB_ACCEPT
  ) {
    return `/${locale}/clubs`;
  }

  return null;
}

function NotificationItem({ notification }: { notification: Notification }) {
  const markAsRead = useMarkNotificationAsRead();
  const router = useRouter();
  const locale = useLocale();

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead.mutate({ id: notification.id });
    }
    const href = resolveNotificationHref(notification, locale);
    if (href) router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left ${
        !notification.isRead ? "bg-primary/5 border-l-2 border-l-primary" : ""
      }`}
    >
      {/* Avatar + type icon badge */}
      <div className="relative flex-shrink-0">
        {notification.actor?.avatar ? (
          <Image
            src={notification.actor.avatar}
            alt={notification.actor.name}
            width={36}
            height={36}
            className="rounded-full object-cover w-9 h-9"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
            {notification.actor?.name?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}
        <span className="absolute -bottom-0.5 -right-0.5 bg-background rounded-full p-0.5 border border-border">
          {TYPE_ICON[notification.type]}
        </span>
      </div>

      {/* Message + time */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug line-clamp-2">
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>

      {/* Unread dot */}
      {!notification.isRead && (
        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
      )}
    </button>
  );
}

export function NotificationDropdown() {
  const { isOpen, close } = useNotificationsStore();
  const { user } = useAuthStore();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useNotifications();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const containerRef = useRef<HTMLDivElement>(null);

  // Infinite scroll sentinel
  const { ref: sentinelRef, inView } = useInView({ threshold: 0.1 });

  // Load next page when sentinel visible
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Close on outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, close]);

  // Mark all as read when panel opens
  useEffect(() => {
    if (isOpen && user?.id) {
      const notifications = data?.pages.flatMap((p) => p.myNotifications) ?? [];
      const hasUnread = notifications.some((n) => !n.isRead);
      if (hasUnread) {
        markAllAsRead.mutate({ userId: user.id });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const notifications = data?.pages.flatMap((p) => p.myNotifications) ?? [];
  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-full mt-2 w-80 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="font-semibold text-foreground text-sm">Notifications</span>
        {hasUnread && (
          <button
            onClick={() => user?.id && markAllAsRead.mutate({ userId: user.id })}
            disabled={markAllAsRead.isPending}
            className="text-xs text-primary hover:underline disabled:opacity-50 flex items-center gap-1"
          >
            <CheckCheck size={12} />
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-[420px] overflow-y-auto divide-y divide-border">
        {isLoading && (
          <div className="flex items-center justify-center py-10 gap-2 text-muted-foreground">
            <RefreshCw size={16} className="animate-spin" />
            <span className="text-sm">Loading…</span>
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

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="py-1">
          {isFetchingNextPage && (
            <div className="flex justify-center py-2">
              <RefreshCw size={14} className="animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
