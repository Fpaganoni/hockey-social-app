"use client";

import { AppShell } from "@/components/layout/app-shell";
import { EditProfileForm } from "@/components/profile/edit/edit-profile-form";

export default function EditProfileRoute() {
  return (
    <AppShell title="Edit Profile">
      <div className="max-w-4xl mx-auto pb-10 px-4 pt-6">
        <EditProfileForm />
      </div>
    </AppShell>
  );
}
