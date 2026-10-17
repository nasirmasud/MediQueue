"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const TutorFilterContext = createContext(null);

const matchesSearch = (tutor, query) => {
  if (!query) return true;
  const haystack = [tutor.tutorName, tutor.subject, tutor.institution]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
};

const matchesCollege = (tutor, college) => {
  if (!college) return true;
  const haystack = tutor.institution.toLowerCase();
  return college.name
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
};

export function TutorFilterProvider({ children }) {
  const [search, setSearch] = useState("");
  const [college, setCollege] = useState(null);

  const filterTutors = useCallback(
    (tutors) =>
      tutors.filter(
        (tutor) => matchesSearch(tutor, search) && matchesCollege(tutor, college)
      ),
    [search, college]
  );

  const value = useMemo(
    () => ({ search, setSearch, college, setCollege, filterTutors }),
    [search, college, filterTutors]
  );

  return (
    <TutorFilterContext.Provider value={value}>{children}</TutorFilterContext.Provider>
  );
}

export function useTutorFilter() {
  const context = useContext(TutorFilterContext);
  if (!context) {
    throw new Error("useTutorFilter must be used within a TutorFilterProvider");
  }
  return context;
}
