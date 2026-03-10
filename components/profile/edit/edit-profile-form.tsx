"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TrajectoryFieldArray } from "./trajectory-field-array";
import { MultimediaFieldArray } from "./multimedia-field-array";
import { toast } from "sonner";

// We'll move validation translations inside the component to use the hook
const createProfileFormSchema = (t: any) =>
  z.object({
    name: z.string().min(2, { message: t("editForm.validation.nameMin") }),
    username: z
      .string()
      .min(2, { message: t("editForm.validation.usernameMin") }),
    avatar: z
      .string()
      .url({ message: t("editForm.validation.urlInvalid") })
      .optional()
      .or(z.literal("")),
    bio: z
      .string()
      .max(500, { message: t("editForm.validation.bioMax") })
      .optional(),
    position: z.string().optional(),
    yearsOfExperience: z.coerce.number().min(0).optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    trajectories: z
      .array(
        z.object({
          id: z.string().optional(),
          title: z
            .string()
            .min(1, { message: t("editForm.validation.titleRequired") }),
          organization: z.string().optional(),
          period: z
            .string()
            .min(1, { message: t("editForm.validation.periodRequired") }),
          description: z.string().optional(),
          startDate: z.string().optional(),
          endDate: z.string().optional(),
          isCurrent: z.boolean().optional(),
        }),
      )
      .optional(),
    multimedia: z
      .array(
        z.object({
          url: z.string().url({ message: t("editForm.validation.urlInvalid") }),
        }),
      )
      .optional(),
  });

type ProfileFormValues = z.infer<ReturnType<typeof createProfileFormSchema>>;

export function EditProfileForm() {
  const router = useRouter();
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");
  const { user, updateUser } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);

  const profileFormSchema = createProfileFormSchema(t);

  // Initialize form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      avatar: user?.avatar || "",
      bio: user?.bio || "",
      position: user?.position || "",
      yearsOfExperience: user?.yearsOfExperience || 0,
      country: user?.country || "",
      city: user?.city || "",
      trajectories:
        user?.trajectories?.map((t) => ({
          id: t.id || "",
          title: t.title || "",
          organization: t.organization || "",
          period: t.period || "",
          description: t.description || "",
          startDate: t.startDate || "",
          endDate: t.endDate || "",
          isCurrent: t.isCurrent || false,
        })) || [],
      multimedia: user?.multimedia?.map((m) => ({ url: m })) || [],
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsSaving(true);
    try {
      // Typically, you would make an API call here.
      // e.g. await updateUserData(data);

      // We update the local state to see changes immediately
      updateUser({
        name: data.name,
        username: data.username,
        avatar: data.avatar,
        bio: data.bio,
        position: data.position as any,
        yearsOfExperience: data.yearsOfExperience,
        country: data.country,
        city: data.city,
        trajectories: data.trajectories as any,
        multimedia: data.multimedia?.map((m) => m.url),
      });

      toast.success(t("editSuccess") || "Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error(error);
      toast.error(
        t("editError") || "Failed to update profile. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>{t("editForm.basicInfo")}</CardTitle>
            <CardDescription>{t("editForm.basicInfoDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("editForm.name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("editForm.placeholders.name")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("editForm.username")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("editForm.placeholders.username")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("editForm.position")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("editForm.placeholders.position")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("editForm.yearsOfExperience")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t(
                          "editForm.placeholders.yearsOfExperience",
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("editForm.bio")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("editForm.placeholders.bio")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("editForm.avatarUrl")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("editForm.placeholders.avatarUrl")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>{t("editForm.location")}</CardTitle>
            <CardDescription>{t("editForm.locationDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("editForm.countryCode")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("editForm.placeholders.countryCode")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("editForm.city")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("editForm.placeholders.city")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Trajectories Array */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>{t("editForm.trajectories")}</CardTitle>
            <CardDescription>{t("editForm.trajectoriesDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <TrajectoryFieldArray control={form.control} t={t} />
          </CardContent>
        </Card>

        {/* Multimedia Array */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>{t("editForm.multimedia")}</CardTitle>
            <CardDescription>{t("editForm.multimediaDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <MultimediaFieldArray control={form.control} t={t} />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-8 pb-10">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/profile")}
            disabled={isSaving}
          >
            {tCommon("cancel")}
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? t("editForm.saving") : t("editForm.saveChanges")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
