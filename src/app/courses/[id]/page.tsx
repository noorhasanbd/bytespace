import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetail from "@/components/CourseDetail";
import { getCourse, getCoursesData } from "@/lib/courses";

type Props = { params: Promise<{ id: string }> };

// Pre-builds one page per course
export async function generateStaticParams() {
  const { courses } = await getCoursesData();
  return courses.map((c) => ({ id: String(c.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) return { title: "Course not found" };

  return {
    title: course.title,
    description:
      course.subtitle ?? `Learn ${course.category} with ${course.author}.`,
    openGraph: { images: [course.image] },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) notFound();

  return <CourseDetail course={course} />;
}