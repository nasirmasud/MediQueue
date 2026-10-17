import { BookOpen, FileDown, GalleryHorizontal, HeartPulse, Table2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { TOOLKITS } from "@/lib/demo";

const ICONS = {
  menu_book: BookOpen,
  view_carousel: GalleryHorizontal,
  table_chart: Table2,
  monitor_heart: HeartPulse,
};

const TILE_TONES = {
  primary: "bg-primary-container/20 text-primary",
  tertiary: "bg-tertiary-container/20 text-tertiary",
  secondary: "bg-secondary-container/20 text-secondary",
};

const Toolkits = () => {
  return (
    <Section tone='surface' spacing='lg'>
      <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4'>
        <div>
          <Eyebrow tone='tertiary'>Free Clinical Downloads</Eyebrow>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1'>
            High-Yield MBBS Exam Toolkits
          </h2>
          <p className='text-body-md text-on-surface-variant mt-2 max-w-xl'>
            Compiled by DMC, CMC &amp; SSMC high-scorers to streamline your last-minute viva
            revision.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {TOOLKITS.map((toolkit) => {
          const Icon = ICONS[toolkit.icon];
          return (
            <Card
              key={toolkit.title}
              tone='surface'
              shadow='none'
              padding='md'
              className='flex flex-col justify-between hover:bg-surface-container transition-all group'
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    TILE_TONES[toolkit.iconTone] ?? TILE_TONES.primary
                  }`}
                >
                  {Icon ? <Icon aria-hidden='true' className='size-[26px]' /> : null}
                </div>
                <h4 className='text-headline-sm text-on-surface mb-1.5'>{toolkit.title}</h4>
                <p className='text-body-sm text-on-surface-variant'>{toolkit.copy}</p>
              </div>
              <button
                type='button'
                className='mt-6 pt-3 flex items-center justify-between text-primary text-label-md group-hover:text-on-surface transition-colors'
              >
                <span>{toolkit.action}</span>
                <FileDown aria-hidden='true' className='size-4' />
              </button>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

export default Toolkits;
