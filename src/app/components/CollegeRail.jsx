import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { COLLEGES, COLLEGE_RAIL_FOOTER } from "@/lib/demo";

const CollegeRail = () => {
  return (
    <Section tone='low' spacing='sm'>
      <div className='text-center'>
        <Eyebrow tone='outline'>Network Institutional Trust</Eyebrow>
        <h3 className='text-headline-sm text-on-surface mt-1 mb-8'>
          Mentors Trained at Premier Bangladesh Government Colleges
        </h3>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
          {COLLEGES.map((college) => (
            <div
              key={college.acronym}
              className='p-4 rounded-xl bg-surface-container flex flex-col items-center justify-center gap-2'
            >
              <span className='text-headline-md text-primary font-bold'>{college.acronym}</span>
              <span className='text-label-sm text-on-surface-variant'>{college.name}</span>
            </div>
          ))}
        </div>
        <p className='text-body-sm text-outline mt-6'>{COLLEGE_RAIL_FOOTER}</p>
      </div>
    </Section>
  );
};

export default CollegeRail;
