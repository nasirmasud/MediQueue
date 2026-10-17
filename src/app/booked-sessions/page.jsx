import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { auth } from "@/lib/auth";
import { createPageMetadata, PAGE_TITLES } from "@/lib/site-metadata";
import { fetchTutorBookings } from "@/lib/tutor-bookings-api.server";
import { ArrowRight, CalendarDays, Mail, Video } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { BookingCancelAlert } from "../components/BookingCancelAlert";

export const metadata = createPageMetadata(PAGE_TITLES.bookedSessions);

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function BookedSessionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  let bookings = [];
  if (user?.id) {
    try {
      const res = await fetchTutorBookings(`/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) bookings = data;
      }
    } catch {
      bookings = [];
    }
  }

  return (
    <Section tone="surface" spacing="lg">
      <div className="mx-auto w-full max-w-5xl">
        <Card padding="lg" shadow="md">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="min-w-0">
              <h1 className="text-headline-lg text-on-surface">
                Welcome back{user?.name ? `, ${user.name}` : ""}
              </h1>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-body-md text-on-surface-variant sm:justify-start">
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">{user?.email}</span>
              </p>
            </div>

            <div className="shrink-0 rounded-2xl bg-primary-container/10 px-6 py-3 text-center">
              <p className="text-label-sm uppercase text-primary">Total Bookings</p>
              <p className="mt-0.5 text-display-lg text-primary tabular">
                {bookings.length}
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
            <h2 className="text-headline-md text-on-surface">
              Your Booked Mentorship Sessions
            </h2>
            <Badge tone="tertiary" variant="tint" size="sm">
              Active Queue
            </Badge>
          </div>

          {bookings.length === 0 ? (
            <Card padding="none" shadow="sm" className="p-12 text-center">
              <span className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary-container/10 text-primary">
                <CalendarDays aria-hidden="true" className="size-8" />
              </span>
              <h3 className="text-headline-sm text-on-surface">No bookings yet</h3>
              <p className="mx-auto mt-1.5 max-w-sm text-body-md text-on-surface-variant">
                You haven&apos;t scheduled any mentorship sessions. Find a verified
                medical tutor to start your preparation.
              </p>
              <Button as={Link} href="/tutors" className="mt-6">
                Browse Expert Tutors
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </Card>
          ) : (
            <div className="flex flex-col gap-4">
              {bookings.map((booking) => (
                <Card
                  key={booking._id}
                  padding="md"
                  shadow="sm"
                  className="card-lift flex flex-col justify-between gap-5 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <Avatar
                      src={booking.image}
                      name={booking.tutorName}
                      alt=""
                      size="md"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate text-headline-sm text-on-surface">
                        {booking.tutorName}
                      </h3>
                      <span className="mt-1 inline-flex items-center gap-1.5 text-body-md text-primary">
                        <span className="size-1.5 rounded-full bg-tertiary" />
                        Online mode
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-body-md text-on-surface-variant sm:flex-row sm:items-center sm:gap-6">
                    <span className="flex items-center gap-2">
                      <CalendarDays
                        aria-hidden="true"
                        className="size-4 shrink-0 text-outline"
                      />
                      {formatDate(booking.bookingDate)}
                    </span>
                    <Badge tone="tertiary" variant="outline" size="xs">
                      Confirmed
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-outline-variant/30 pt-3 sm:border-t-0 sm:pt-0">
                    <div>
                      <span className="block text-label-sm uppercase text-outline">
                        Session Fee
                      </span>
                      <span className="text-headline-md text-on-surface tabular">
                        ৳{booking.fee}
                        <span className="text-label-md font-normal text-on-surface-variant">
                          /hr
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="primary" size="sm">
                        <Video aria-hidden="true" className="size-4" />
                        Join
                      </Button>
                      <BookingCancelAlert bookingId={booking._id} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
