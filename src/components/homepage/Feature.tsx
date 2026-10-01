"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MdCheckCircle } from "react-icons/md";
import CourseCard from "@/components/ui/CourseCard";
import ProgressCard from "@/components/ui/ProgressCard";
import type { CoursesData } from "@/types/course";

const stats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

const benefits = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

export default function Features() {
  const [data, setData] = useState<CoursesData | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/courses.json", { signal: controller.signal })
      .then((res) => res.json())
      .then((json: CoursesData) => setData(json))
      .catch(() => {}); // the card is decorative, so fail silently

    return () => controller.abort();
  }, []);

  const firstCourse = data?.courses[0];

  return (
    <section className="relative overflow-hidden bg-base-100">
      {/* Soft background glows */}
      <div className="pointer-events-none absolute left-24 -top-80 h-150 w-150 rounded-full bg-[#C6F432]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-[#3B5BFF]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-[#C6F432]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-[#3B5BFF]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-24 px-4 py-20">
        {/* Row 1: text left, illustration right */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Your Path to Professional
              <br />
              Growth Starts Here!
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-base-content/70">
              Explore our curated selection of courses tailored to enhance your
              capabilities and accelerate your career journey. Whether you are
              looking to sharpen specific skills, gain industry expertise, or
              embark on a new career path entirely, we have the resources you
              need.
            </p>

            <dl className="mt-8 flex gap-10">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="text-xs text-base-content/60">{s.label}</dt>
                  <dd className="text-2xl font-semibold text-primary">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto h-[440px] w-full  sm:h-[480px]">
            {/* Back: first course from courses.json */}
            {firstCourse && data && (
              <div className="absolute left-0 top-0 z-0 w-96">
                <CourseCard course={firstCourse} avatars={data.avatars} />
              </div>
            )}

            {/* Middle: boy */}
            <Image
              src="/hero/boy.png"
              alt="Student learning with a laptop"
              width={900}
              height={480}
              className="absolute bottom-0 right-0 z-10 h-auto top-5"
            />

            {/* Front: squiggle + progress card */}
            <Image
              src="/feature/shape-green-squiggle.png"
              alt=""
              aria-hidden="true"
              width={200}
              height={96}
              className="pointer-events-none absolute -right-4 top-30 z-20 "
            />
            <ProgressCard value={55} className="absolute right-5 top-60 z-15" />
          </div>
        </div>

        {/* Row 2: illustration left, text right */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative mx-auto  md:order-1">
            <Image
              src="/feature/girl.png"
              alt="Creator with a tablet and revenue cards"
              width={1000}
              height={520}
              className="relative z-10  "
            />
            <Image
              src="/feature/shape-green-squiggle.png"
              alt=""
              aria-hidden="true"
              width={500}
              height={96}
              className="pointer-events-none absolute right-10 top-15 z-20  sm:w-24 zoom-200 rotate-45"
            />
            {/* Total Revenue Card */}
            <div className="w-[270px] rounded-2xl bg-[#073DDB] px-5  py-5 text-white absolute left-8  top-10 sm:right-5 sm:top-5">
              <p className="text-[16px] font-medium leading-5">Total Revenue</p>

              <p className="text-[11px] text-white/80">July 1-28</p>

              <p className="mt-2 text-[25px] font-bold leading-none">$120.29</p>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[50%] rounded-full bg-[#C6FF00]" />
              </div>
            </div>

            {/* Year to Date Card */}
            <div className="w-[150px] rounded-2xl bg-[#073DDB] p-5  text-white absolute left-10  top-50 sm:right-5 sm:top-">
              <p className="text-[16px] font-medium leading-5">Year to Date</p>

              <p className="text-[11px] text-white/80">2023</p>

              <p className="mt-3 text-[24px] font-bold leading-none">
                $1,200.38
              </p>

              <span className="mt-4 inline-flex rounded-full bg-[#C6FF00] px-2 py-1 text-[10px] font-semibold text-black">
                +12%
              </span>
            </div>
          </div>

          <div className="md:order-2">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Create &amp; Manage
              <br />
              Courses Easily.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-base-content/70">
              <strong className="text-base-content">ByteSpace</strong> supports
              individuals or entities in the creation, publication, and
              administration of educational courses.
            </p>

            <ul className="mt-6 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm">
                  <MdCheckCircle className="shrink-0 text-primary" size={20} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
