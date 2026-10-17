import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { auth } from "@/lib/auth";
import { createPageMetadata, PAGE_TITLES } from "@/lib/site-metadata";
import { Inbox, Mail, Plus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import MyTutorsList from "../components/MyTutorsList";

export const metadata = createPageMetadata(PAGE_TITLES.myTutors);

export default async function MyTutorsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  let myTutors = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`);
    const data = res.ok ? await res.json() : null;
    if (Array.isArray(data)) {
      myTutors = data.filter((tutor) => tutor.email === user?.email);
    }
  } catch {
    myTutors = [];
  }

  return (
    <Section tone="surface" spacing="lg">
      <div className="mx-auto w-full max-w-5xl">
        <Card padding="lg" shadow="md">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="min-w-0">
              <Eyebrow>Mentor Studio</Eyebrow>
              <h1 className="mt-3 text-headline-lg text-on-surface">My Created Tutors</h1>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-body-md text-on-surface-variant sm:justify-start">
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">{user?.email}</span>
              </p>
            </div>

            <div className="shrink-0 rounded-2xl bg-primary-container/10 px-6 py-3 text-center">
              <p className="text-label-sm uppercase text-primary">Total Added</p>
              <p className="mt-0.5 text-display-lg text-primary tabular">
                {myTutors.length}
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
            <h2 className="text-headline-md text-on-surface">Manage Your Tutor Profiles</h2>
            <Button as={Link} href="/add-tutor" variant="outline" size="sm">
              <Plus aria-hidden="true" className="size-4" />
              Add New Tutor
            </Button>
          </div>

          {myTutors.length === 0 ? (
            <Card padding="none" shadow="sm" className="p-12 text-center">
              <span className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary-container/10 text-primary">
                <Inbox aria-hidden="true" className="size-8" />
              </span>
              <h3 className="text-headline-sm text-on-surface">No tutors created yet</h3>
              <p className="mx-auto mt-1.5 max-w-sm text-body-md text-on-surface-variant">
                Publish your first listing and students on MediQueue can book sessions
                with you.
              </p>
              <Button as={Link} href="/add-tutor" className="mt-6">
                <Plus aria-hidden="true" className="size-4" />
                Create First Listing
              </Button>
            </Card>
          ) : (
            <MyTutorsList initialTutors={myTutors} />
          )}
        </div>
      </div>
    </Section>
  );
}
