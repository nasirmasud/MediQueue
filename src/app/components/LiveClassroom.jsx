import { Download, Mic, Presentation, Siren, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CLASSROOM_DEMO } from "@/lib/demo";

const FEED_TONES = {
  primary: { wrap: "bg-surface-container-low", who: "text-primary" },
  secondary: { wrap: "bg-surface-container-low", who: "text-secondary" },
  tertiary: { wrap: "bg-tertiary-container/20", who: "text-tertiary" },
};

const LiveClassroom = () => {
  const {
    eyebrow,
    title,
    copy,
    host,
    caseTitle,
    lead,
    vitals,
    svgPath,
    paperSpeed,
    finding,
    promptLabel,
    prompt,
    feed,
    primaryAction,
    secondaryAction,
  } = CLASSROOM_DEMO;

  return (
    <Section tone='surface' spacing='lg' className='overflow-hidden'>
      <div className='flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4'>
        <div>
          <Eyebrow tone='tertiary'>{eyebrow}</Eyebrow>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1'>
            {title}
          </h2>
          <p className='text-body-md text-on-surface-variant mt-2 max-w-xl'>{copy}</p>
        </div>
        <div className='flex items-center gap-3'>
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-tertiary text-label-sm'>
            <span
              aria-hidden='true'
              className='w-2 h-2 rounded-full bg-tertiary animate-pulse'
            />
            Host: {host}
          </span>
        </div>
      </div>

      <div className='w-full rounded-2xl bg-surface-container-low shadow-2xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6'>
        <div className='lg:col-span-7 flex flex-col gap-4'>
          <div className='flex items-center justify-between bg-surface-container p-3 rounded-xl'>
            <div className='flex items-center gap-2'>
              <Siren aria-hidden='true' className='size-5 text-error shrink-0' />
              <span className='text-headline-sm text-on-surface'>{caseTitle}</span>
            </div>
            <div className='flex items-center gap-3 text-on-surface-variant text-label-sm'>
              <span className='flex items-center gap-1'>
                <Mic aria-hidden='true' className='size-4 text-tertiary' />
                Active
              </span>
              <span className='flex items-center gap-1'>
                <Video aria-hidden='true' className='size-4 text-tertiary' />
                1080p HD
              </span>
            </div>
          </div>

          <div className='relative w-full h-48 bg-surface-container-lowest rounded-xl overflow-hidden p-4 flex flex-col justify-between'>
            <div className='flex items-center justify-between text-on-surface-variant text-label-sm'>
              <span className='text-error font-mono font-bold'>{lead}</span>
              <span className='font-mono text-tertiary'>{vitals}</span>
            </div>
            <svg
              aria-hidden='true'
              className='w-full h-24 text-tertiary'
              fill='none'
              preserveAspectRatio='none'
              viewBox='0 0 500 80'
            >
              <path
                d={svgPath}
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2.5'
              />
            </svg>
            <div className='flex items-center justify-between text-label-sm text-outline'>
              <span>{paperSpeed}</span>
              <span className='text-tertiary'>{finding}</span>
            </div>
          </div>

          <div className='p-4 rounded-xl bg-surface-container flex flex-col gap-2'>
            <span className='text-label-sm uppercase text-secondary'>{promptLabel}</span>
            <p className='text-body-md text-on-surface font-medium'>&ldquo;{prompt}&rdquo;</p>
          </div>
        </div>

        <div className='lg:col-span-5 flex flex-col justify-between bg-surface-container p-4 rounded-xl gap-4'>
          <div>
            <div className='flex items-center justify-between pb-3'>
              <span className='text-headline-sm text-on-surface'>Interactive Session Feed</span>
              <span className='px-2 py-0.5 rounded bg-surface-container-highest text-tertiary text-label-sm'>
                4 Candidates
              </span>
            </div>
            <div className='space-y-3 pt-2 text-body-sm'>
              {feed.map((entry) => {
                const tone = FEED_TONES[entry.tone] ?? FEED_TONES.primary;
                return (
                  <div key={entry.who} className={`p-3 rounded-lg ${tone.wrap}`}>
                    <span className={`${tone.who} font-bold block text-label-sm`}>
                      {entry.who}:
                    </span>
                    <span className='text-on-surface'>{entry.body}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='flex flex-col gap-2 pt-4'>
            <Button block className='px-4'>
              <Download aria-hidden='true' className='size-[18px]' />
              {primaryAction}
            </Button>
            <Button variant='secondary' block className='px-4'>
              <Presentation aria-hidden='true' className='size-[18px]' />
              {secondaryAction}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default LiveClassroom;
