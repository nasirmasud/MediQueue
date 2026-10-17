"use client";

import { useMemo } from "react";
import TutorCard from "./TutorCard";
import { useTutorFilter } from "./TutorFilterContext";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { getFeaturedTutors } from "@/lib/demo";

const AvailableTutors = () => {
  const { filterTutors } = useTutorFilter();

  const tutors = useMemo(() => {
    try {
      return getFeaturedTutors();
    } catch {
      return [];
    }
  }, []);

  const visibleTutors = useMemo(() => filterTutors(tutors), [tutors, filterTutors]);

  return (
    <Section id='tutors-directory' tone='surface' spacing='lg'>
      <div className='text-center max-w-2xl mx-auto mb-14'>
        <Eyebrow>BMDC Verified Mentors</Eyebrow>
        <h2 className='text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1'>
          Featured Medical Mentors
        </h2>
        <p className='text-body-md text-on-surface-variant mt-3'>
          Book verified tutors from Bangladesh&apos;s elite medical institutions. Live
          interactive sessions tailored to your target exam.
        </p>
      </div>

      {visibleTutors.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {visibleTutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      ) : (
        <p className='text-center text-body-md text-on-surface-variant'>
          No mentors match your search or college filter yet.
        </p>
      )}
    </Section>
  );
};

export default AvailableTutors;
