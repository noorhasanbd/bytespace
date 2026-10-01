
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineMenuBook,
  MdOutlineOndemandVideo,
  MdOutlineSupportAgent,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import { previewLessons } from "@/data/courseExtras";
import type { Course } from "@/types/course";

const includes = [
  { label: "Learning Resources", Icon: MdOutlineMenuBook },
  { label: "Quality Lesson Videos", Icon: MdOutlineOndemandVideo },
  { label: "Certificate of Completion", Icon: MdOutlineWorkspacePremium },
  { label: "Private Consultation", Icon: MdOutlineSupportAgent },
];

export default function EnrollCard({ course }: { course: Course }) {
  const [enrolled, setEnrolled] = useState(false);
  const moreVideos = Math.max(0, course.lessons - previewLessons.length);

  return (
    <div className="rounded-3xl bg-white p-6 text-sm text-gray-900 shadow-xl">
      <h2 className="text-base font-semibold text-gray-900">
        {course.lessons} Lessons ({course.duration})
      </h2>

      <ol className="mt-4 space-y-3">
        {previewLessons.map((lesson, i) => (
          <li key={lesson.title} className="flex items-start gap-3">
            <span className="text-gray-500">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 text-gray-800">{lesson.title}</span>
            <span className="text-xs text-[#1C39BB]">
              {lesson.duration}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-3 text-gray-500">{moreVideos} more videos</p>

      <p className="mt-5 text-xs text-gray-600">
        Ready to Dive In? Enroll Now and Start Building Your Digital Future!
      </p>

      <p className="mt-4">
        <span className="text-2xl font-bold text-[#1C39BB]">
          ${course.price}
        </span>
        <span className="text-xs text-gray-500">/lifetime</span>
      </p>

      <button
        type="button"
        onClick={() => setEnrolled((e) => !e)}
        aria-pressed={enrolled}
        className="mt-4 h-11 w-full rounded-full bg-[#C6F432] font-medium text-black transition-opacity hover:opacity-80"
      >
        {enrolled ? "Enrolled ✓" : "Enroll Now"}
      </button>

      <h3 className="mt-6 text-base font-semibold text-gray-900">
        This course includes
      </h3>

      <ul className="mt-3 space-y-3">
        {includes.map(({ label, Icon }) => (
          <li key={label} className="flex items-center gap-3 text-gray-700">
            <Icon size={18} className="shrink-0 text-[#1C39BB]" />
            {label}
          </li>
        ))}
      </ul>

      <hr className="my-5 border-gray-200" />

      <div className="flex items-center gap-3">
        <Image
          src="https://randomuser.me/api/portraits/men/22.jpg"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">{course.author}</p>
          <p className="text-xs text-gray-500">Professional Creator</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-600">
        Ready to Dive In? Enroll Now and Start Building Your Digital Future!
      </p>

      <Link
        href="/creators"
        className="mt-4 inline-block rounded-full border border-gray-300 px-4 py-2 text-xs text-gray-800 hover:bg-gray-100"
      >
        See Full Profile
      </Link>
    </div>
  );
}