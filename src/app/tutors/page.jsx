"use client";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { Spinner } from "@/components/ui/Spinner";
import { Search, SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import TutorCard from "../components/TutorCard";
import { useDebounce } from "../hooks/useDebounce";

const FILTERS = [
  {
    key: "subject",
    label: "Filter by subject",
    placeholder: "by Subject",
    options: ["Anatomy", "Physiology", "Biochemistry", "Pathology", "General Medicine"],
  },
  {
    key: "city",
    label: "Filter by city",
    placeholder: "by City",
    options: ["Chittagong", "Dhaka", "Sylhet"],
  },
  {
    key: "price",
    label: "Filter by price",
    placeholder: "by Price",
    options: ["0-500", "500-1000"],
  },
  {
    key: "mode",
    label: "Filter by teaching mode",
    placeholder: "by Mode",
    options: ["Online", "Offline", "Both"],
  },
];

const EMPTY_FILTERS = { subject: "", city: "", price: "", mode: "" };

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [attempt, setAttempt] = useState(0);

  const debouncedSearch = useDebounce(search, 400);
  const isFiltered = debouncedSearch.trim() !== "" || Object.values(filters).some(Boolean);

  useEffect(() => {
    let cancelled = false;

    const fetchTutors = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (filters.subject) params.set("subject", filters.subject);
        if (filters.city) params.set("city", filters.city);
        if (filters.price) params.set("price", filters.price);
        if (filters.mode) params.set("mode", filters.mode);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tutors?${params.toString()}`
        );
        const data = await res.json().catch(() => null);

        if (cancelled) return;

        if (!res.ok) {
          setFailed(true);
          setTutors([]);
          return;
        }

        setFailed(false);
        setTutors(Array.isArray(data) ? data : []);
      } catch {
        if (cancelled) return;
        setFailed(true);
        setTutors([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTutors();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, filters, attempt]);

  const clearFilters = () => {
    setSearch("");
    setFilters(EMPTY_FILTERS);
  };

  return (
    <>
      <Section tone="lowest" spacing="md">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Browse the Directory</Eyebrow>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
            Find Your Perfect Expert Tutor
          </h1>
          <p className="mt-3 text-body-lg text-on-surface-variant">
            Book verified tutors, attend live sessions, and clear your target exam with
            MediQueue.
          </p>
        </div>
      </Section>

      <section className="w-full bg-surface-container-low py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 lg:flex-row lg:px-12">
          <div className="w-full lg:w-80">
            <Input
              type="search"
              aria-label="Search tutors"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Type tutor name, subject, or institution..."
              leadingIcon={<Search />}
            />
          </div>

          <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 lg:w-auto lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILTERS.map((filter) => (
              <div key={filter.key} className="w-[9.5rem] shrink-0">
                <Select
                  size="sm"
                  shape="pill"
                  aria-label={filter.label}
                  value={filters[filter.key]}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      [filter.key]: event.target.value,
                    }))
                  }
                  placeholder={filter.placeholder}
                >
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section tone="surface" spacing="lg">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <Spinner size="lg" />
            <p className="text-body-md text-on-surface-variant">Loading tutors...</p>
          </div>
        ) : failed ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <SearchX aria-hidden="true" className="size-8 text-outline" />
            <p className="text-body-lg text-on-surface">
              We couldn&apos;t reach the tutor directory.
            </p>
            <p className="max-w-sm text-body-md text-on-surface-variant">
              The server didn&apos;t respond. Check your connection and try again.
            </p>
            <Button variant="outline" onClick={() => setAttempt((n) => n + 1)}>
              Retry
            </Button>
          </div>
        ) : tutors.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <SearchX aria-hidden="true" className="size-8 text-outline" />
            <p className="text-body-lg text-on-surface">
              {isFiltered
                ? "No tutors match those filters."
                : "No tutors are listed yet."}
            </p>
            <p className="max-w-sm text-body-md text-on-surface-variant">
              {isFiltered
                ? "Try a different subject, city, or fee range."
                : "Check back shortly, or add your own listing."}
            </p>
            {isFiltered && (
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
};

export default TutorsPage;
