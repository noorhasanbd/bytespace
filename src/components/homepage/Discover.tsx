"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/ui/CourseCard";
import type { CoursesData } from "@/types/course";

const VISIBLE_COUNT = 18; // pills shown before "+ More"

export default function Discover() {
  const [data, setData] = useState<CoursesData | null>(null);
  const [error, setError] = useState(false);
  const [active, setActive] = useState("Featured");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/courses.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load courses");
        return res.json();
      })
      .then((json: CoursesData) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") setError(true);
      });

    return () => controller.abort();
  }, []);

  const categories = data?.categories ?? [];
  const visibleCategories = showMore
    ? categories
    : categories.slice(0, VISIBLE_COUNT);

  const filtered =
    data?.courses.filter((c) =>
      active === "Featured" ? c.featured : c.category === active
    ) ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 text-center">
      <h2 className="text-4xl font-semibold md:text-5xl">
        Discover Your Passion,
        <br />
        Build Your Skills
      </h2>
      <p className="mx-auto mt-6 max-w-3xl text-base-content/60">
        At Bytespace Courses, we bring you closer to life-changing knowledge.
        Explore a variety of courses across different fields, from technology to
        the arts, and make a difference in your career and life.
      </p>

      {error && (
        <p className="mt-14 text-error">
          Could not load courses. Please refresh the page.
        </p>
      )}

      {!data && !error && (
        <p className="mt-14 text-base-content/60">Loading courses...</p>
      )}

      {data && (
        <>
          {/* Category pills */}
          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
            {visibleCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={`rounded-full px-4 py-2 text-base transition-colors ${
                  active === cat
                    ? "bg-[#C6F432] font-medium text-black"
                    : "bg-base-200 font-normal hover:bg-base-300"
                }`}
              >
                {cat}
              </button>
            ))}
            {!showMore && categories.length > VISIBLE_COUNT && (
              <button
                type="button"
                onClick={() => setShowMore(true)}
                className="px-2 text-primary"
              >
                + More
              </button>
            )}
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="mt-14 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  avatars={data.avatars}
                />
              ))}
            </div>
          ) : (
            <p className="mt-14 text-base-content/60">
              No courses in this category yet.
            </p>
          )}
        </>
      )}
    </section>
  );
}