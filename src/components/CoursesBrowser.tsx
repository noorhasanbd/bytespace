"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  MdBarChart,
  MdCategory,
  MdFilterList,
  MdKeyboardArrowDown,
  MdSearch,
  MdSort,
} from "react-icons/md";
import CourseCard from "@/components/ui/CourseCard";
import { useCourses } from "@/hooks/useCourses";
import type { Course } from "@/types/course";

type SortKey = "relevant" | "rating" | "priceLow" | "priceHigh" | "students";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevant", label: "Most relevant" },
  { value: "rating", label: "Highest rated" },
  { value: "priceLow", label: "Price: low to high" },
  { value: "priceHigh", label: "Price: high to low" },
  { value: "students", label: "Most students" },
];

const ratingOptions = [0, 4, 4.5, 4.7];

function sortCourses(list: Course[], sort: SortKey) {
  const copy = [...list];
  switch (sort) {
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "priceLow":
      return copy.sort((a, b) => a.price - b.price);
    case "priceHigh":
      return copy.sort((a, b) => b.price - a.price);
    case "students":
      return copy.sort((a, b) => b.students - a.students);
    default:
      return copy; // original JSON order
  }
}

type SelectPillProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
};

function SelectPill({ icon, label, value, onChange, children }: SelectPillProps) {
  return (
    <label className="relative flex h-10 items-center rounded-full border border-base-300 pl-4 pr-3 text-sm hover:bg-base-200">
      <span className="sr-only">{label}</span>
      {icon}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none bg-transparent pl-2 pr-5 outline-none"
      >
        {children}
      </select>
      <MdKeyboardArrowDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
      />
    </label>
  );
}

export default function CoursesBrowser() {
  const params = useSearchParams();
  const { data, error } = useCourses();

  const [query, setQuery] = useState("");
  const [searchIn, setSearchIn] = useState<"courses" | "creators">("courses");
  const [level, setLevel] = useState("all");
  const [category, setCategory] = useState(params.get("category") ?? "Featured");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortKey>("relevant");
  const [showFilters, setShowFilters] = useState(false);

  const categories = data?.categories ?? [];
  const levels = Array.from(new Set(data?.courses.map((c) => c.level) ?? []));
  // Falls back to Featured if the ?category= value isn't a real category
  const activeCategory = categories.includes(category) ? category : "Featured";

  const results = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();

    const filtered = data.courses.filter((c) => {
      // When searching, look across every category
      const matchesCategory =
        q !== "" ||
        (activeCategory === "Featured" ? c.featured : c.category === activeCategory);
      const matchesLevel = level === "all" || c.level === level;
      const matchesRating = c.rating >= minRating;
      const text = searchIn === "courses" ? c.title : c.author;
      return matchesCategory && matchesLevel && matchesRating && text.toLowerCase().includes(q);
    });

    return sortCourses(filtered, sort);
  }, [data, query, searchIn, activeCategory, level, minRating, sort]);

  const clearAll = () => {
    setQuery("");
    setLevel("all");
    setCategory("Featured");
    setMinRating(0);
    setSort("relevant");
  };

  return (
    <>
      {/* Banner */}
      <section
        className="text-white"
        style={
          {
            backgroundColor: "#1C39BB",
            "--grid-opacity": 0.15,
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,var(--grid-opacity)) 2px, transparent 2px),
              linear-gradient(to bottom, rgba(255,255,255,var(--grid-opacity)) 2px, transparent 2px)
            `,
            backgroundSize: "80px 80px",
          } as React.CSSProperties
        }
      >
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <h1 className="text-3xl font-semibold md:text-4xl">Find Your Next Course</h1>

          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center"
          >
            <label className="relative block flex-1">
              <span className="sr-only">Search</span>
              <MdSearch
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="h-12 w-full rounded-full bg-white pl-11 pr-4 text-base text-black outline-none placeholder:text-base-content/50"
              />
            </label>

            <label className="relative">
              <span className="sr-only">Search in</span>
              <select
                value={searchIn}
                onChange={(e) => setSearchIn(e.target.value as "courses" | "creators")}
                className="h-12 w-full cursor-pointer appearance-none rounded-full bg-[#C6F432] pl-6 pr-11 font-medium text-black outline-none"
              >
                <option value="courses">Courses</option>
                <option value="creators">Creators</option>
              </select>
              <MdKeyboardArrowDown
                size={20}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black"
              />
            </label>
          </form>
        </div>
      </section>

      {/* Filters + results */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFilters((s) => !s)}
              aria-expanded={showFilters}
              className="flex h-10 items-center gap-2 rounded-full border border-base-300 px-4 text-sm hover:bg-base-200"
            >
              <MdFilterList size={18} />
              Filter
            </button>

            <SelectPill
              icon={<MdBarChart size={18} />}
              label="Level"
              value={level}
              onChange={setLevel}
            >
              <option value="all">Level</option>
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </SelectPill>

            <SelectPill
              icon={<MdCategory size={18} />}
              label="Category"
              value={activeCategory}
              onChange={setCategory}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectPill>
          </div>

          <SelectPill
            icon={<MdSort size={18} />}
            label="Sort by"
            value={sort}
            onChange={(v) => setSort(v as SortKey)}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </SelectPill>
        </div>

        {/* Extra filters, opened by the Filter button */}
        {showFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-base-200 p-4 text-sm">
            <span className="mr-2 font-medium">Minimum rating</span>
            {ratingOptions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setMinRating(r)}
                aria-pressed={minRating === r}
                className={`rounded-full px-4 py-1.5 ${
                  minRating === r
                    ? "bg-[#C6F432] font-medium text-black"
                    : "bg-base-100 hover:bg-base-300"
                }`}
              >
                {r === 0 ? "Any" : `${r}+`}
              </button>
            ))}
            <button type="button" onClick={clearAll} className="ml-auto text-primary">
              Clear all
            </button>
          </div>
        )}

        {/* Category pills */}
        <div
          role="group"
          aria-label="Categories"
          className="mt-6 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                activeCategory === cat
                  ? "bg-[#C6F432] font-medium text-black"
                  : "bg-base-200 hover:bg-base-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        {error && (
          <p className="mt-14 text-center text-error">
            Could not load courses. Please refresh the page.
          </p>
        )}
        {!data && !error && (
          <p className="mt-14 text-center text-base-content/60">Loading courses...</p>
        )}

        {data && (
          <>
            <p aria-live="polite" className="mt-8 text-sm text-base-content/60">
              {results.length} {results.length === 1 ? "course" : "courses"} found
            </p>

            {results.length > 0 ? (
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((course) => (
                  <CourseCard key={course.id} course={course} avatars={data.avatars} />
                ))}
              </div>
            ) : (
              <div className="mt-14 text-center">
                <p className="text-base-content/60">No courses match your filters.</p>
                <button type="button" onClick={clearAll} className="mt-3 text-primary">
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}