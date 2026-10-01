"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdBarChart, MdStar } from "react-icons/md";
import type { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  avatars: string[];
};

const badge =
  "rounded-full bg-white/70 px-3 py-1 text-xs text-base-content backdrop-blur-sm";

export default function CourseCard({ course, avatars }: CourseCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="rounded-[2rem] border border-base-300 bg-base-100 p-4">
      {/* Thumbnail with badges */}
      <div className="relative h-48 overflow-hidden rounded-2xl bg-base-200">
        {!imageFailed && (
          <Image
            src={course.image}
            alt={course.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <span className={badge}>{course.lessons} Lessons</span>
          <span className={badge}>{course.duration}</span>
          <span className={badge}>{course.comments} Comments</span>
        </div>
      </div>

      {/* Title, author, rating */}
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">
            <Link href={`/courses/${course.id}`} className="hover:text-primary">
              {course.title}
            </Link>
          </h3>
          <p className="text-xs text-base-content/60">
            by <span className="text-primary">{course.author}</span>
          </p>
        </div>
        <p className="flex items-center gap-1 text-base-content/60">
          {course.rating}
          <MdStar className="text-base-300" size={20} />
        </p>
      </div>

      {/* Level + students */}
      <div className="mt-4 flex items-center gap-4">
        <span className="flex items-center gap-2 rounded-full bg-base-200 px-4 py-2 text-sm">
          <MdBarChart size={18} />
          {course.level}
        </span>

        <div className="flex items-center">
          {avatars.slice(0, 4).map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={32}
              height={32}
              className={`h-8 w-8 rounded-full border-2 border-white object-cover ${
                i > 0 ? "-ml-2" : ""
              }`}
            />
          ))}
          <span className="-ml-2 flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-white bg-[#C6F432] px-1 text-xs font-medium text-black">
            {course.students}+
          </span>
        </div>
      </div>

      {/* Price */}
      <p className="mt-4">
        <span className="text-xl font-bold text-primary">${course.price}</span>
        <span className="text-xs text-base-content/60">/lifetime</span>
      </p>
    </article>
  );
}