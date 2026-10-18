"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Spinner } from "@/components/ui/Spinner";
import { authClient } from "@/lib/auth-client";
import { Mail, User } from "lucide-react";
import Link from "next/link";

const META_ICON = "size-[18px] shrink-0 text-primary";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" label="Loading your profile" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <Eyebrow>Profile</Eyebrow>
        <p className="mt-3 text-body-lg text-on-surface">
          Sign in to view your profile.
        </p>
        <Button as={Link} href="/sign-in" className="mt-6">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <Section tone="surface" spacing="lg">
      <div className="mx-auto w-full max-w-3xl">
        <div className="text-center">
          <Eyebrow>Account</Eyebrow>
          <h1 className="mt-3 text-headline-lg text-on-surface">My Profile</h1>
          <p className="mt-2 text-body-md text-on-surface-variant">
            Your MediQueue account details.
          </p>
        </div>

        <Card padding="lg" shadow="md" className="mt-8">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <Avatar
              src={user.image}
              name={user.name}
              alt=""
              size="lg"
              referrerPolicy="no-referrer"
            />

            <dl className="w-full flex-1 space-y-5">
              <div className="flex items-center gap-3">
                <User aria-hidden="true" className={META_ICON} />
                <div className="min-w-0">
                  <dt className="text-label-sm uppercase text-outline">Full Name</dt>
                  <dd className="truncate text-headline-sm text-on-surface">
                    {user.name || "—"}
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail aria-hidden="true" className={META_ICON} />
                <div className="min-w-0">
                  <dt className="text-label-sm uppercase text-outline">Email</dt>
                  <dd className="truncate text-body-md text-on-surface">
                    {user.email || "—"}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </Card>
      </div>
    </Section>
  );
}
