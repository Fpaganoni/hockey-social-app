"use client";

import { Header } from "@/components/layout/header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { EditProfileForm } from "@/components/profile/edit/edit-profile-form";

export default function EditProfileRoute() {
  return (
    <>
      <Header title="Edit Profile" />
      <main className="bg-overlay max-w-4xl mx-auto pb-24 px-4 pt-6">
        <EditProfileForm />
      </main>
      <BottomNavigation />
    </>
  );
}
