"use client";

import { useEffect } from "react";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/useAuthStore";
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket-client";
import { notificationsQueryKey, notificationsCountQueryKey } from "@/hooks/useNotifications";
import { Notification, NotificationsPage, UnreadCountResponse } from "@/types/models/notification";

function getToastIcon(type: Notification["type"]): string {
  const icons: Record<Notification["type"], string> = {
    LIKE_POST: "❤️",
    LIKE_COMMENT: "❤️",
    COMMENT_POST: "💬",
    REPLY_COMMENT: "↩️",
    FOLLOW_USER: "👤",
    CLUB_INVITE: "🏑",
    CLUB_ACCEPT: "✅",
    JOB_APPLICATION_UPDATE: "💼",
  };
  return icons[type] ?? "🔔";
}

export function useNotificationSocket() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.id) return;

    connectSocket(user.id);
    const socket = getSocket();

    function handleNotification(notification: Notification) {
      toast(`${getToastIcon(notification.type)} ${notification.message}`, {
        duration: 4000,
      });

      // Prepend to first page of infinite list
      queryClient.setQueryData<InfiniteData<NotificationsPage>>(
        notificationsQueryKey(user!.id),
        (old) => {
          if (!old) return old;
          const [firstPage, ...rest] = old.pages;
          return {
            ...old,
            pages: [
              {
                myNotifications: [notification, ...(firstPage?.myNotifications ?? [])],
              },
              ...rest,
            ],
          };
        }
      );

      // Increment unread count
      queryClient.setQueryData<UnreadCountResponse>(
        notificationsCountQueryKey(user!.id),
        (old) => ({
          unreadNotificationsCount: (old?.unreadNotificationsCount ?? 0) + 1,
        })
      );
    }

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
      disconnectSocket();
    };
  }, [user?.id, queryClient]);
}
