import BookingModal from "@/app/components/BookingModal";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { cn } from "@/components/ui/cn";
import { createPageMetadata } from "@/lib/site-metadata";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  Banknote,
  BookOpen,
  Building2,
  CalendarDays,
  Clock,
  Layers,
  MapPin,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return createPageMetadata("Tutor Details");
    }

    const tutor = await res.json();
    const name = tutor?.tutorName?.trim();

    return createPageMetadata(
      name ? `${name} – ${tutor.subject || "Tutor"}` : "Tutor Details"
    );
  } catch {
    return createPageMetadata("Tutor Details");
  }
}

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;

  let tutorData = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`);
    if (res.ok) tutorData = await res.json();
  } catch {
    tutorData = null;
  }

  if (!tutorData?._id) notFound();

  const {
    tutorName,
    subject,
    image,
    availability,
    hourlyFee,
    totalSlot,
    startDate,
    teachingMode,
    district,
    address,
    institution,
    experienceYears,
  } = tutorData;

  const stats = [
    { label: "Hourly Fee", value: `৳${hourlyFee}`, icon: Banknote },
    { label: "Experience", value: `${experienceYears}+ yrs`, icon: Award },
    { label: "Teaching Mode", value: teachingMode, icon: Monitor },
    { label: "Slots Left", value: `${totalSlot} open`, icon: Layers },
  ];

  const details = [
    { label: "Availability", value: availability, icon: Clock },
    { label: "Start Date", value: startDate, icon: CalendarDays },
    { label: "Slots Remaining", value: `${totalSlot}`, icon: Layers },
  ];

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-6 pt-6 lg:px-12">
        <Link
          href="/tutors"
          className="inline-flex items-center gap-2 text-label-md text-primary transition-colors hover:text-surface-tint"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to all tutors
        </Link>
      </div>

      <Section as="main" tone="surface" spacing="lg">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Card padding="lg" shadow="md">
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
                <Avatar
                  src={image}
                  name={tutorName}
                  alt=""
                  size="xl"
                  ring="surface"
                  status="tertiary"
                  statusSize="md"
                  statusLabel={`${tutorName} is verified`}
                  referrerPolicy="no-referrer"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                    <Badge tone="tertiary" variant="solid">
                      Verified Mentor
                    </Badge>
                    <Badge tone="primary" variant="solid">
                      Live Session
                    </Badge>
                  </div>

                  <h1 className="mt-3 flex items-center justify-center gap-2 text-headline-lg text-on-surface md:justify-start">
                    <span className="truncate">{tutorName}</span>
                    <BadgeCheck
                      aria-hidden="true"
                      className="size-5 shrink-0 text-tertiary"
                    />
                  </h1>

                  <p className="mt-1 flex items-center justify-center gap-2 text-body-lg font-medium text-primary md:justify-start">
                    <BookOpen aria-hidden="true" className="size-[18px] shrink-0" />
                    {subject} Specialist
                  </p>

                  <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-body-md text-on-surface-variant md:justify-start">
                    <span className="flex items-center gap-1.5">
                      <Building2 aria-hidden="true" className="size-4 shrink-0 text-primary" />
                      <span className="truncate">{institution}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
                      {district}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <Card key={label} padding="md" shadow="sm" className="text-center">
                  <Icon aria-hidden="true" className="mx-auto size-6 text-primary" />
                  <p className="mt-2 text-label-sm uppercase text-on-surface-variant">
                    {label}
                  </p>
                  <p className="mt-0.5 truncate text-headline-sm text-on-surface tabular">
                    {value}
                  </p>
                </Card>
              ))}
            </div>

            <Card padding="lg" shadow="md">
              <Eyebrow as="h2">About the Tutor</Eyebrow>
              <p className="mt-3 text-body-lg leading-relaxed text-on-surface-variant">
                I teach {subject} with the same approach I used for my own finals — exam
                structure first, clinical correlation second. Over{" "}
                {experienceYears} years at {institution}, my sessions have taken more
                than 40 students through the same concepts.
              </p>

              <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-outline-variant/30 pt-5 md:grid-cols-2">
                <div>
                  <dt className="text-label-sm uppercase text-outline">Education</dt>
                  <dd className="mt-1 text-body-md font-medium text-on-surface">
                    {institution}
                  </dd>
                </div>
                <div>
                  <dt className="text-label-sm uppercase text-outline">Address</dt>
                  <dd className="mt-1 text-body-md font-medium text-on-surface">
                    {address}, {district}
                  </dd>
                </div>
              </dl>
            </Card>
          </div>

          <div className="space-y-6 lg:sticky lg:top-20 lg:col-span-4">
            <Card padding="lg" shadow="xl">
              <div className="flex items-end justify-between gap-4">
                <span className="text-label-md uppercase text-on-surface-variant">
                  Session Fee
                </span>
                <span className="text-headline-md font-bold text-primary tabular">
                  ৳{hourlyFee}
                  <span className="text-body-md font-normal text-on-surface-variant">
                    /hr
                  </span>
                </span>
              </div>

              <div className="mt-6 space-y-3 border-t border-outline-variant/30 pt-5">
                <p className="text-label-md text-on-surface">Session Details</p>
                {details.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                      <Icon aria-hidden="true" className="size-4 shrink-0" />
                      {label}
                    </span>
                    <span
                      className={cn(
                        "truncate text-body-md font-medium tabular",
                        label === "Slots Remaining" && Number(totalSlot) === 0
                          ? "text-error"
                          : "text-on-surface"
                      )}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <BookingModal tutorData={tutorData} />
              </div>
            </Card>

            <Card padding="md" shadow="sm">
              <h3 className="flex items-center gap-2 text-headline-sm text-on-surface">
                <ShieldCheck aria-hidden="true" className="size-[18px] shrink-0 text-tertiary" />
                Verified Information
              </h3>
              <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">
                Every listing on MediQueue is manually reviewed before it goes live, so the
                name, institution, and experience on this profile are verified.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
};

export default TutorDetailsPage;
