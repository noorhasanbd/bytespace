import { Suspense } from "react";
import type { Metadata } from "next";
import CoursesBrowser from "@/components/CoursesBrowser";

export const metadata: Metadata = {
  title: "Courses",
  description: "Search and filter all ByteSpace courses by category, level and rating.",
};

export default function CoursesPage() {
  return (
    // useSearchParams needs a Suspense boundary
    <Suspense fallback={null}>
      <CoursesBrowser />
    </Suspense>
  );
}