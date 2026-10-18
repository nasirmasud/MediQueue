import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { TUTOR_RECRUIT } from "@/lib/demo";

const TutorRecruit = () => {
  return (
    <Section tone='surface' spacing='none' className='py-28'>
      <div className='p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-high shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8'>
        <div className='max-w-xl'>
          <Eyebrow tone='tertiary'>{TUTOR_RECRUIT.eyebrow}</Eyebrow>
          <h3 className='text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mt-2'>
            {TUTOR_RECRUIT.title}
          </h3>
          <p className='text-body-md text-on-surface-variant mt-3'>{TUTOR_RECRUIT.copy}</p>
        </div>
        <div className='flex flex-col sm:flex-row items-center gap-4 shrink-0'>
          <Button as={Link} href={TUTOR_RECRUIT.href} size='lg'>
            {TUTOR_RECRUIT.primaryCta}
          </Button>
          <Button variant='secondary' size='lg'>
            {TUTOR_RECRUIT.secondaryCta}
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default TutorRecruit;
