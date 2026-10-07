/**
 * Single import surface for curated demo data.
 *
 * Phases 1-11 build against this module. Phase 12a replaces the imports here
 * with real API calls — components should not need to change, only this file.
 */

import { DEMO_OWNER, DEMO_TUTORS, DEMO_TUTORS_EXTENDED } from "./tutors";

export {
  TRUST_METRICS,
  COLLEGES,
  SUBJECT_TRACKS,
  HOW_IT_WORKS,
  COLLEGE_RAIL_FOOTER,
  PROF_TRACKS,
  TESTIMONIALS,
  WHY_FEATURES,
  COMPARISON_ROWS,
  TOOLKITS,
  FAQS,
  TUTOR_RECRUIT,
  FINAL_CTA,
  CLASSROOM_DEMO,
} from "./content";

export { DEMO_OWNER, DEMO_TUTORS, DEMO_TUTORS_EXTENDED };

/** All tutors, home + browse batches. */
export function getDemoTutors() {
  return [...DEMO_TUTORS, ...DEMO_TUTORS_EXTENDED];
}

/** Mirrors `GET /featured-tutors`, which returns `limit` records. */
export function getFeaturedTutors(limit = 6) {
  return DEMO_TUTORS.slice(0, limit);
}

/** Mirrors `GET /tutors?search=&subject=&city=&price=&mode=`. */
export function searchDemoTutors({
  search = "",
  subject = "",
  city = "",
  price = "",
  mode = "",
} = {}) {
  const needle = search.trim().toLowerCase();
  const [min, max] = price.includes("-")
    ? price.split("-").map(Number)
    : [null, null];

  return getDemoTutors().filter((tutor) => {
    if (needle) {
      const haystack = [tutor.tutorName, tutor.subject, tutor.institution]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    if (subject && tutor.subject !== subject) return false;
    if (city && tutor.district !== city) return false;
    if (mode && tutor.teachingMode !== mode) return false;
    if (min !== null && tutor.hourlyFee < min) return false;
    if (max !== null && tutor.hourlyFee > max) return false;
    return true;
  });
}

/** Mirrors `GET /tutors/:id`. */
export function getDemoTutorById(id) {
  return getDemoTutors().find((tutor) => tutor._id === id) ?? null;
}

/** Mirrors `GET /my-tutors/:email`. */
export function getDemoTutorsByOwner(email) {
  return getDemoTutors().filter((tutor) => tutor.addedBy === email);
}
