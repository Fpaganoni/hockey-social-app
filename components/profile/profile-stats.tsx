"use client";

import { useFollowUser, useFollowingUser } from "@/hooks/useUsers";
import { Loader } from "../ui/loader";
import { Error } from "../ui/error";
import { mapRoleToEntityType } from "@/lib/utils/entity-type";

interface ProfileStatsProps {
  userId: string;
  userRole: string;
}

export function ProfileStats({ userId, userRole }: ProfileStatsProps) {
  // Convert role (PLAYER, COACH, CLUB) to entity type (USER, CLUB)
  const entityType = mapRoleToEntityType(userRole);

  const {
    data: followersData,
    isLoading: followersIsLoading,
    error: followersError,
  } = useFollowUser(entityType, userId);
  const {
    data: followingData,
    isLoading: followingIsLoading,
    error: followingError,
  } = useFollowingUser(entityType, userId);

  if (followersIsLoading || followingIsLoading) return <Loader />;

  if (followersError || followingError)
    return <Error>Error to load data</Error>;

  const followersCount = followersData?.followers?.length || 0;
  const followingCount = followingData?.followings?.length || 0;

  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold">{followersCount}</span>
        <span className="text-foreground-muted">Followers</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">{followingCount}</span>
        <span className="text-foreground-muted">Following</span>
      </div>
    </div>
  );
}
