import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import {
  GET_NOTIFICATIONS,
  GET_UNREAD_NOTIFICATIONS_COUNT,
} from "@/graphql/notification/queries";
import {
  MARK_NOTIFICATION_AS_READ,
  MARK_ALL_NOTIFICATIONS_AS_READ,
} from "@/graphql/notification/mutations";
import {
  Notification,
  NotificationsResponse,
  UnreadCountResponse,
  MarkAsReadResponse,
  MarkAllAsReadResponse,
  MarkAsReadVariables,
  MarkAllAsReadVariables,
} from "@/types/models/notification";
import { useAuthStore } from "@/stores/useAuthStore";

type NotificationsMutationContext = {
  previousNotifications?: NotificationsResponse;
  previousCount?: UnreadCountResponse;
};

export function useNotifications(limit = 20, offset = 0) {
  const { user } = useAuthStore();

  return useQuery<NotificationsResponse>({
    queryKey: ["notifications", user?.id, limit, offset],
    queryFn: () =>
      graphqlClient.request(GET_NOTIFICATIONS, {
        userId: user!.id,
        limit,
        offset,
      }),
    enabled: !!user?.id,
    staleTime: 30_000,
  });
}

export function useUnreadNotificationsCount() {
  const { user } = useAuthStore();

  return useQuery<UnreadCountResponse>({
    queryKey: ["notifications-count", user?.id],
    queryFn: () =>
      graphqlClient.request(GET_UNREAD_NOTIFICATIONS_COUNT, {
        userId: user!.id,
      }),
    enabled: !!user?.id,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation<
    MarkAsReadResponse,
    Error,
    MarkAsReadVariables,
    NotificationsMutationContext
  >({
    mutationFn: (variables) =>
      graphqlClient.request(MARK_NOTIFICATION_AS_READ, variables),

    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ["notifications", user?.id] });
      await queryClient.cancelQueries({ queryKey: ["notifications-count", user?.id] });

      const previousNotifications = queryClient.getQueryData<NotificationsResponse>(
        ["notifications", user?.id, 20, 0]
      );
      const previousCount = queryClient.getQueryData<UnreadCountResponse>(
        ["notifications-count", user?.id]
      );

      queryClient.setQueryData<NotificationsResponse>(
        ["notifications", user?.id, 20, 0],
        (old) => {
          if (!old) return old;
          return {
            notifications: old.notifications.map((n) =>
              n.id === id ? { ...n, isRead: true } : n
            ),
          };
        }
      );

      queryClient.setQueryData<UnreadCountResponse>(
        ["notifications-count", user?.id],
        (old) => {
          if (!old) return old;
          return {
            unreadNotificationsCount: Math.max(
              0,
              old.unreadNotificationsCount - 1
            ),
          };
        }
      );

      return { previousNotifications, previousCount };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ["notifications", user?.id, 20, 0],
          context.previousNotifications
        );
      }
      if (context?.previousCount) {
        queryClient.setQueryData(
          ["notifications-count", user?.id],
          context.previousCount
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["notifications-count", user?.id] });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation<
    MarkAllAsReadResponse,
    Error,
    MarkAllAsReadVariables,
    NotificationsMutationContext
  >({
    mutationFn: (variables) =>
      graphqlClient.request(MARK_ALL_NOTIFICATIONS_AS_READ, variables),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["notifications", user?.id] });
      await queryClient.cancelQueries({ queryKey: ["notifications-count", user?.id] });

      const previousNotifications = queryClient.getQueryData<NotificationsResponse>(
        ["notifications", user?.id, 20, 0]
      );
      const previousCount = queryClient.getQueryData<UnreadCountResponse>(
        ["notifications-count", user?.id]
      );

      queryClient.setQueryData<NotificationsResponse>(
        ["notifications", user?.id, 20, 0],
        (old) => {
          if (!old) return old;
          return {
            notifications: old.notifications.map((n) => ({ ...n, isRead: true })),
          };
        }
      );

      queryClient.setQueryData<UnreadCountResponse>(
        ["notifications-count", user?.id],
        { unreadNotificationsCount: 0 }
      );

      return { previousNotifications, previousCount };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ["notifications", user?.id, 20, 0],
          context.previousNotifications
        );
      }
      if (context?.previousCount) {
        queryClient.setQueryData(
          ["notifications-count", user?.id],
          context.previousCount
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["notifications-count", user?.id] });
    },
  });
}
