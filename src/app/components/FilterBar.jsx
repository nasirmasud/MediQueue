"use client";

import { cn } from "@/components/ui/cn";
import { COLLEGES } from "@/lib/demo";
import { Search } from "lucide-react";
import { useTutorFilter } from "./TutorFilterContext";

const PILL = "whitespace-nowrap px-4 py-2 rounded-full text-label-md transition-colors";
const ACTIVE = "bg-primary-container text-white shadow-sm";
const INACTIVE =
  "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface";

export function FilterBar() {
  const { search, setSearch, college, setCollege } = useTutorFilter();

  return (
    <section className="w-full bg-surface-container-low py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-outline" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by subject, card, or doctor..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-high transition-colors"
          />
        </div>

        <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setCollege(null)}
            aria-pressed={!college}
            className={cn(PILL, !college ? ACTIVE : INACTIVE)}
          >
            All Mentors
          </button>
          {COLLEGES.map((item) => {
            const isActive = college?.acronym === item.acronym;
            return (
              <button
                key={item.acronym}
                type="button"
                onClick={() => setCollege(item)}
                aria-pressed={isActive}
                className={cn(PILL, isActive ? ACTIVE : INACTIVE)}
              >
                {item.name} ({item.acronym})
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FilterBar;
