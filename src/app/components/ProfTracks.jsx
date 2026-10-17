import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { cn } from "@/components/ui/cn";
import { PROF_TRACKS } from "@/lib/demo";

const BADGE_TONES = {
  primary: "bg-primary-container/20 text-primary",
  secondary: "bg-secondary-container/20 text-secondary",
  tertiary: "bg-tertiary-container/20 text-tertiary",
};

const ProfTracks = () => {
  return (
    <Section tone='lowest' spacing='lg'>
      <div className='text-center max-w-2xl mx-auto mb-16'>
        <Eyebrow>Comprehensive Roadmaps</Eyebrow>
        <h2 className='text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1'>
          Structured MBBS Prof Tracks
        </h2>
        <p className='text-body-md text-on-surface-variant mt-3'>
          Designed for targeted revision sprints before collegiate send-ups and final board
          examinations.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {PROF_TRACKS.map((track) => (
          <div
            key={track.title}
            className={cn(
              "rounded-2xl p-8 flex flex-col justify-between",
              track.popular
                ? "bg-surface-container shadow-2xl relative"
                : "bg-surface-container-low shadow-lg hover:-translate-y-1 transition-all"
            )}
          >
            {track.popular ? (
              <div className='absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary-container text-white text-label-sm font-bold shadow-md'>
                Most Popular
              </div>
            ) : null}

            <div>
              <div
                className={`inline-flex px-3 py-1 rounded-full text-label-sm mb-4 ${
                  BADGE_TONES[track.badgeTone] ?? BADGE_TONES.primary
                }`}
              >
                {track.badge}
              </div>
              <h3 className='text-headline-lg text-on-surface mb-2'>{track.title}</h3>
              <p className='text-body-sm text-on-surface-variant mb-6'>{track.copy}</p>
              <ul className='space-y-3 text-body-sm text-on-surface mb-8'>
                {track.features.map((feature) => (
                  <li key={feature} className='flex items-center gap-2.5'>
                    <CircleCheck aria-hidden='true' className='size-[18px] text-tertiary shrink-0' />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className='text-2xl font-bold text-on-surface mb-4 tabular'>
                ৳{track.price.toLocaleString("en-US")}{" "}
                <span className='text-body-sm text-on-surface-variant font-normal'>
                  {track.priceUnit}
                </span>
              </div>
              <Button
                block
                variant={track.popular ? "primary" : "secondary"}
                className={cn("py-3", track.popular && "shadow-md")}
              >
                Enroll in Track
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ProfTracks;
