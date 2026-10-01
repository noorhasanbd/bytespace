"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MdBarChart,
  MdPeople,
  MdPlayArrow,
  MdShare,
  MdStar,
  MdVideocam,
} from "react-icons/md";

import EnrollCard from "@/components/ui/EnrollCard";
import ProgressCard from "@/components/ui/ProgressCard";
import { modules, reviews } from "@/data/courseExtras";
import type { Course } from "@/types/course";

const tabs = ["About", "Content", "Reviews"] as const;

type Tab = (typeof tabs)[number];

const chip =
  "flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black";

export default function CourseDetail({
  course,
}: {
  course: Course;
}) {
  const [tab, setTab] = useState<Tab>("Content");
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("All");

  /* =========================================================
     SHARE
  ========================================================= */

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: course.title,
          url,
        });
      } catch {
        // User closed the share dialog
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch {
        // Clipboard unavailable
      }
    }
  };

  /* =========================================================
     REVIEW FILTER
  ========================================================= */

  const filteredReviews =
    reviewFilter === "All"
      ? reviews
      : reviews.filter(
          (review: any) =>
            String(review.rating ?? 5) === reviewFilter
        );

  return (
    <div className="relative overflow-x-clip">
      {/* =====================================================
          BLUE TOP SECTION
      ===================================================== */}

      <section className="relative text-white">
        {/* Full-width blue background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 inset-y-0 z-0"
          style={{
            backgroundColor: "#1C39BB",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.15) 2px, transparent 2px), linear-gradient(to bottom, rgba(255,255,255,0.15) 2px, transparent 2px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* =================================================
            TOP CONTENT
        ================================================= */}

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-28">
          <div className="grid gap-x-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="min-w-0">
              {/* Header */}
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h1 className="text-2xl font-semibold md:text-3xl">
                    {course.title}
                  </h1>

                  <p className="mt-2 text-sm font-medium">
                    {course.subtitle ??
                      `Unlock the power of ${course.category} with expert guidance`}
                  </p>

                  <p className="mt-3 text-xs">
                    by{" "}
                    <span className="text-[#C6F432]">
                      {course.author}
                    </span>
                  </p>
                </div>

                {/* Share */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-[#C6F432] px-4 py-2 text-sm font-medium text-black transition hover:opacity-80"
                >
                  <MdShare size={16} />
                  <span>{copied ? "Link copied" : "Share"}</span>
                </button>
              </div>

              {/* Course chips */}
              <ul className="mt-4 flex flex-wrap gap-3">
                <li className={chip}>
                  <MdBarChart size={16} />
                  {course.level}
                </li>

                <li className={chip}>
                  <MdStar size={16} className="text-[#C6F432]" />
                  {course.rating} ({course.comments} reviews)
                </li>

                <li className={chip}>
                  <MdPeople size={16} />
                  {course.students}+ Students
                </li>
              </ul>

              {/* =================================================
                  VIDEO
              ================================================= */}

              <div className="relative mt-8 aspect-video overflow-hidden rounded-3xl bg-base-200 shadow-xl">
                {playing && course.video ? (
                  <video
                    src={course.video}
                    poster={course.image}
                    controls
                    autoPlay
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      priority
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover"
                    />

                    <button
                      type="button"
                      aria-label="Play preview"
                      onClick={() => setPlaying(true)}
                      className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#C6F432] text-black shadow-lg transition hover:scale-110"
                    >
                      <MdPlayArrow size={32} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* =================================================
                ENROLL CARD
            ================================================= */}

            <aside className="relative z-30 mt-8 lg:mt-12">
              <EnrollCard course={course} />
            </aside>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHITE CONTENT SECTION
      ========================================================= */}

      <section className="relative bg-base-100">
        <div className="mx-auto max-w-7xl px-4 pb-20">
          <div className="grid gap-x-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="min-w-0">
              {/* =================================================
                  TABS
              ================================================= */}

              <div
                role="tablist"
                aria-label="Course details"
                className="flex gap-2 border-b border-base-300 pb-4 mt-8"
              >
                {tabs.map((t) => {
                  const active = tab === t;

                  return (
                    <button
                      key={t}
                      type="button"
                      role="tab"
                      id={`tab-${t}`}
                      aria-selected={active}
                      aria-controls={`panel-${t}`}
                      onClick={() => setTab(t)}
                      className={`rounded-full px-5 py-2 text-sm transition ${
                        active
                          ? "bg-[#C6F432] font-medium text-black"
                          : "bg-base-200 text-base-content hover:bg-base-300"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              {/* =================================================
                  TAB CONTENT
              ================================================= */}

              <div
                role="tabpanel"
                id={`panel-${tab}`}
                aria-labelledby={`tab-${tab}`}
                className="mt-8"
              >
                {/* =================================================
                    ABOUT
                ================================================= */}

                {tab === "About" && (
                  <div>
                    <h2 className="text-xl font-semibold">
                      About this course
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-base-content/70">
                      {course.title} is a{" "}
                      {course.level.toLowerCase()} course in{" "}
                      {course.category}, taught by {course.author}.
                      It contains {course.lessons} lessons (
                      {course.duration}) with practical examples
                      that you can apply straight away.
                    </p>

                    <h3 className="mt-8 text-base font-semibold">
                      Description
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-base-content/70">
                      This course provides a structured learning
                      experience designed to help you understand the
                      fundamentals and apply them through practical
                      examples.
                    </p>
                  </div>
                )}

                {/* =================================================
                    CONTENT
                ================================================= */}

                {tab === "Content" && (
                  <div>
                    <h2 className="text-xl font-semibold">
                      Explore the Modules
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-base-content/70">
                      Immerse yourself in the course content as we
                      break down each module into comprehensive
                      lessons, providing practical insights and
                      hands-on experiences.
                    </p>

                    <h3 className="mt-8 text-base font-semibold">
                      Lesson List
                    </h3>

                    <ul className="mt-5 space-y-6">
                      {modules.map((m: any) => (
                        <li
                          key={m.title}
                          className="flex items-start gap-4"
                        >
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C6F432] text-black">
                            <MdVideocam size={22} />
                          </span>

                          <div>
                            <h4 className="text-sm font-semibold">
                              {m.title}
                            </h4>

                            <p className="mt-1 max-w-xl text-xs leading-6 text-base-content/70">
                              {m.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <h3 className="mt-10 text-base font-semibold">
                      Lesson Content
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-base-content/70">
                      Engage with each lesson through video content,
                      detailed explanations, and interactive
                      elements. Download resources, complete
                      assignments, and test your understanding with
                      quizzes.
                    </p>

                    <h3 className="mt-8 text-base font-semibold">
                      Lesson Progress Tracking
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-base-content/70">
                      Track your progress as you complete lessons and
                      move through your learning journey.
                    </p>

                    <div className="mt-5 max-w-md">
                      <ProgressCard value={55} />
                    </div>
                  </div>
                )}

                {/* =================================================
                    REVIEWS
                ================================================= */}

                {tab === "Reviews" && (
                  <div className="max-w-3xl">
                    {/* Review heading */}
                    <h2 className="text-xl font-semibold">
                      What Learners Are Saying
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-base-content/60">
                      Discover what our learners have to say about
                      their experience with {course.title}. Read
                      ratings and reviews from individuals who have
                      embraced the course and transformed their
                      learning journey.
                    </p>

                    {/* =================================================
                        RATING SUMMARY
                    ================================================= */}

                    <div className="mt-5 rounded-xl border border-base-300 bg-white p-5">
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        {/* Overall rating */}
                        <div className="flex min-w-[105px] flex-col items-center justify-center border-r border-base-300 pr-5">
                          <p className="text-[10px] font-medium text-base-content/50">
                            Rating
                          </p>

                          <p className="mt-1 text-3xl font-bold">
                            {course.rating}
                          </p>

                          <div className="mt-1 text-sm tracking-[2px] text-base-content">
                            ★★★★★
                          </div>
                        </div>

                        {/* Rating bars */}
                        <div className="flex-1 space-y-2">
                          {[
                            {
                              stars: 5,
                              percent: 82,
                              count: 720,
                            },
                            {
                              stars: 4,
                              percent: 15,
                              count: 120,
                            },
                            {
                              stars: 3,
                              percent: 3,
                              count: 21,
                            },
                            {
                              stars: 2,
                              percent: 1,
                              count: 12,
                            },
                            {
                              stars: 1,
                              percent: 1,
                              count: 16,
                            },
                          ].map((item) => (
                            <div
                              key={item.stars}
                              className="flex items-center gap-3"
                            >
                              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-base-300">
                                <div
                                  className="h-full rounded-full bg-[#C6F432]"
                                  style={{
                                    width: `${item.percent}%`,
                                  }}
                                />
                              </div>

                              <div className="w-[70px] whitespace-nowrap text-[10px] tracking-[1px] text-base-content/70">
                                {"★".repeat(item.stars)}
                                {"☆".repeat(5 - item.stars)}
                              </div>

                              <span className="w-7 text-right text-[10px] text-base-content/50">
                                {item.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* =================================================
                        INDIVIDUAL REVIEWS
                    ================================================= */}

                    <div className="mt-6">
                      <h3 className="text-sm font-semibold">
                        Individual Reviews:
                      </h3>

                      {/* =================================================
                          FILTER BUTTONS
                      ================================================= */}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "All",
                          "5",
                          "4",
                          "3",
                          "2",
                          "1",
                        ].map((filter) => {
                          const active =
                            reviewFilter === filter;

                          return (
                            <button
                              key={filter}
                              type="button"
                              onClick={() =>
                                setReviewFilter(filter)
                              }
                              className={`flex h-7 items-center gap-1.5 rounded-full px-3 text-[10px] font-medium transition ${
                                active
                                  ? "bg-[#C6F432] text-black"
                                  : "border border-base-300 bg-white text-base-content/70 hover:bg-base-200"
                              }`}
                            >
                              {filter === "All" ? (
                                "All rating"
                              ) : (
                                <>
                                  <span>{filter}</span>
                                  <span className="text-[9px]">
                                    ★
                                  </span>
                                </>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* =================================================
                          REVIEW CARDS
                      ================================================= */}

                      <div className="mt-5 space-y-3">
                        {filteredReviews.length > 0 ? (
                          filteredReviews.map(
                            (r: any, index: number) => {
                              const rating = Math.min(
                                5,
                                Math.max(
                                  1,
                                  Number(r.rating ?? 5)
                                )
                              );

                              return (
                                <div
                                  key={`${r.name}-${index}`}
                                  className="rounded-xl border border-base-300 bg-white p-4"
                                >
                                  {/* Reviewer */}
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-base-200 text-xs font-semibold">
                                        {r.image ? (
                                          <Image
                                            src={r.image}
                                            alt={r.name}
                                            width={36}
                                            height={36}
                                            className="h-full w-full object-cover"
                                          />
                                        ) : (
                                          r.name?.charAt(0)
                                        )}
                                      </div>

                                      <div>
                                        <p className="text-xs font-medium">
                                          {r.name}
                                        </p>

                                        <p className="text-[9px] text-base-content/50">
                                          {r.role ??
                                            "UI/UX Designer"}
                                        </p>
                                      </div>
                                    </div>

                                    <span className="text-[9px] text-base-content/50">
                                      {r.date ?? "a year ago"}
                                    </span>
                                  </div>

                                  {/* Rating */}
                                  <div className="mt-3 text-[11px] tracking-[2px] text-base-content">
                                    {"★".repeat(rating)}
                                    {"☆".repeat(5 - rating)}
                                  </div>

                                  {/* Text */}
                                  <p className="mt-2 text-[10px] leading-5 text-base-content/60">
                                    {r.text}
                                  </p>
                                </div>
                              );
                            }
                          )
                        ) : (
                          <div className="rounded-xl border border-base-300 p-8 text-center">
                            <p className="text-sm text-base-content/60">
                              No reviews found for this rating.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right-side spacing to align with EnrollCard */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>
    </div>
  );
}