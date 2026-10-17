import Link from "next/link";
import {
  Activity,
  ChevronRight,
  FlaskConical,
  HeartPulse,
  Microscope,
  Pill,
  Stethoscope,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SUBJECT_TRACKS } from "@/lib/demo";

const ICONS = {
  vital_signs: Activity,
  ecg_heart: HeartPulse,
  science: FlaskConical,
  biotech: Microscope,
  medication: Pill,
  stethoscope: Stethoscope,
};

const TILE_TONES = {
  primary:
    "bg-primary-container/20 text-primary group-hover:bg-primary-container group-hover:text-white",
  tertiary:
    "bg-tertiary-container/20 text-tertiary group-hover:bg-tertiary-container group-hover:text-white",
  secondary:
    "bg-secondary-container/20 text-secondary group-hover:bg-secondary-container group-hover:text-white",
};

const SubjectTracks = () => {
  return (
    <Section tone='lowest' spacing='md'>
      <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4'>
        <div>
          <Eyebrow>Curriculum Focus</Eyebrow>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight mt-1'>
            Explore by Medical Subject
          </h2>
          <p className='text-body-md text-on-surface-variant mt-2 max-w-xl'>
            Targeted drills built strictly around BMDC guidelines and Prof examination formats.
          </p>
        </div>
        <Link
          href='#tutors-directory'
          className='inline-flex items-center gap-1.5 text-label-md text-primary hover:text-on-surface transition-colors'
        >
          <span>Explore all {SUBJECT_TRACKS.length} subjects</span>
          <ChevronRight aria-hidden='true' className='size-4' />
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {SUBJECT_TRACKS.map((track) => {
          const Icon = ICONS[track.icon];
          return (
            <Card
              key={track.title}
              tone='surface'
              shadow='sm'
              padding='md'
              interactive
            >
              <div className='flex items-center justify-between mb-4'>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    TILE_TONES[track.iconTone] ?? TILE_TONES.primary
                  }`}
                >
                  {Icon ? <Icon aria-hidden='true' className='size-[26px]' /> : null}
                </div>
                <span
                  className={`text-label-sm px-2.5 py-1 rounded ${
                    track.featured
                      ? "bg-primary-container text-white font-bold"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {track.stage}
                </span>
              </div>
              <h3 className='text-headline-md text-on-surface mb-2'>{track.title}</h3>
              <p className='text-body-sm text-on-surface-variant leading-relaxed'>{track.copy}</p>
              <div className='mt-4 pt-4 flex items-center justify-between text-on-surface-variant text-label-sm'>
                <span>{track.tutorCount} Active Tutors</span>
                <span className='text-primary group-hover:translate-x-1 transition-transform'>
                  Browse track →
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

export default SubjectTracks;
