import { BadgeCheck, CalendarDays, CircleCheck, CircleX, Clock } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { COMPARISON_ROWS, WHY_FEATURES } from "@/lib/demo";

const ICONS = {
  verified: BadgeCheck,
  calendar_month: CalendarDays,
  schedule: Clock,
};

const TILE_TONES = {
  tertiary: "bg-tertiary-container/30 text-tertiary",
  primary: "bg-primary-container/30 text-primary",
  secondary: "bg-secondary-container/30 text-secondary",
};

export default function WhyChooseUs() {
  return (
    <Section tone='lowest' spacing='lg'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
        <div className='lg:col-span-5 flex flex-col gap-6'>
          <Eyebrow>The MediQueue Standard</Eyebrow>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight'>
            Premium Medical Mentorship, Made Simple &amp; Secure.
          </h2>
          <p className='text-body-md text-on-surface-variant'>
            MediQueue is engineered specifically to eliminate unverified coaching risks,
            schedule clashes, and unrecorded lectures for MBBS students nationwide.
          </p>
          <div className='space-y-4 pt-2'>
            {WHY_FEATURES.map((feature) => {
              const Icon = ICONS[feature.icon];
              return (
                <div key={feature.title} className='flex items-start gap-3'>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      TILE_TONES[feature.iconTone] ?? TILE_TONES.primary
                    }`}
                  >
                    {Icon ? <Icon aria-hidden='true' className='size-[18px]' /> : null}
                  </div>
                  <div>
                    <h4 className='text-headline-sm text-on-surface'>{feature.title}</h4>
                    <p className='text-body-sm text-on-surface-variant'>{feature.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='lg:col-span-7 rounded-2xl bg-surface-container-low p-6 sm:p-8 shadow-xl'>
          <div className='flex items-center justify-between pb-4'>
            <span className='text-headline-sm text-on-surface'>Feature Breakdown</span>
            <div className='flex items-center gap-6 text-label-md'>
              <span className='text-primary font-bold'>MediQueue</span>
              <span className='text-outline'>Unverified Coaching</span>
            </div>
          </div>
          <div className='space-y-4 pt-4 text-body-sm'>
            {COMPARISON_ROWS.map((row) => (
              <div key={row.label} className='flex items-center justify-between py-2'>
                <span className='text-on-surface'>{row.label}</span>
                <div className='flex items-center gap-12'>
                  {row.ours ? (
                    <CircleCheck aria-hidden='true' className='size-5 text-tertiary' />
                  ) : (
                    <CircleX aria-hidden='true' className='size-5 text-outline' />
                  )}
                  {row.theirs ? (
                    <CircleCheck aria-hidden='true' className='size-5 text-tertiary' />
                  ) : (
                    <CircleX aria-hidden='true' className='size-5 text-outline' />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
