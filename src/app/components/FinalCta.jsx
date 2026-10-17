import Link from "next/link";
import { BadgeCheck, CalendarDays, School, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FINAL_CTA } from "@/lib/demo";

const TRUST_ICONS = {
  "BMDC Verified": BadgeCheck,
  "Instant Booking": Zap,
  "Flexible Slots": CalendarDays,
};

const FinalCta = () => {
  return (
    <section className='w-full bg-gradient-to-b from-surface via-surface-container-lowest to-[#070420] py-24 relative overflow-hidden'>
      <div
        aria-hidden='true'
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary-container/20 blur-[130px] pointer-events-none'
      />
      <div className='max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10'>
        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high text-primary text-label-sm mb-6'>
          <School aria-hidden='true' className='size-4' />
          <span>{FINAL_CTA.eyebrow}</span>
        </div>
        <h2 className='text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight'>
          {FINAL_CTA.title}
        </h2>
        <p className='text-body-lg text-on-surface-variant mt-6 max-w-2xl mx-auto'>
          {FINAL_CTA.copy}
        </p>
        <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
          <Button as={Link} href='/#tutors-directory' size='xl'>
            {FINAL_CTA.primaryCta}
          </Button>
          <Button as={Link} href={FINAL_CTA.secondaryHref} variant='secondary' size='xl'>
            {FINAL_CTA.secondaryCta}
          </Button>
        </div>
        <div className='mt-12 flex flex-wrap items-center justify-center gap-8 text-on-surface-variant text-label-sm'>
          {FINAL_CTA.trustPoints.map((point) => {
            const Icon = TRUST_ICONS[point];
            return (
              <span key={point} className='flex items-center gap-1.5'>
                {Icon ? <Icon aria-hidden='true' className='size-[18px] text-tertiary' /> : null}
                {point}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
