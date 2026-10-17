import { CalendarCheck, Compass, MonitorPlay } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { HOW_IT_WORKS } from "@/lib/demo";

const ICONS = {
  travel_explore: Compass,
  event_available: CalendarCheck,
  cast_for_education: MonitorPlay,
};

const TILE_TONES = {
  primary: "bg-primary/10 text-primary",
  tertiary: "bg-tertiary/10 text-tertiary",
  secondary: "bg-secondary/10 text-secondary",
};

const HowItWorks = () => {
  return (
    <Section id='how-it-works' tone='lowest' spacing='lg'>
      <div className='text-center max-w-2xl mx-auto mb-16'>
        <Eyebrow>Simple &amp; Frictionless</Eyebrow>
        <h2 className='text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1'>
          How MediQueue Works
        </h2>
        <p className='text-body-md text-on-surface-variant mt-3'>
          Your path to MBBS honors and clinical viva confidence in three seamless steps.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 relative'>
        {HOW_IT_WORKS.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <Card
              key={item.step}
              tone='surface'
              shadow='lg'
              padding='lg'
              className='relative flex flex-col items-center text-center group hover:bg-surface-container transition-all'
            >
              <div className='absolute -top-5 w-10 h-10 rounded-full bg-primary-container text-white text-headline-sm flex items-center justify-center shadow-md'>
                {item.step}
              </div>
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center my-4 group-hover:scale-110 transition-transform ${
                  TILE_TONES[item.iconTone] ?? TILE_TONES.primary
                }`}
              >
                {Icon ? <Icon aria-hidden='true' className='size-9' /> : null}
              </div>
              <h3 className='text-headline-md text-on-surface mb-2'>{item.title}</h3>
              <p className='text-body-sm text-on-surface-variant leading-relaxed'>{item.copy}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

export default HowItWorks;
