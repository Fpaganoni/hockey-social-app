import { AppShell } from "@/components/layout/app-shell";
import { UserProfilePage } from "@/components/pages/user-profile-page";

export default function ProfileRoute() {
  return (
    <AppShell title="Profile">
      <UserProfilePage isOwnProfile={true} />
    </AppShell>
  );
}
