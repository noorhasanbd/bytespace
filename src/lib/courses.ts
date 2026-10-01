import { cache } from "react";
import { readFile } from "fs/promises";
import path from "path";
import type { Course, CoursesData } from "@/types/course";

export const getCoursesData = cache(async (): Promise<CoursesData> => {
  const file = await readFile(
    path.join(process.cwd(), "public", "courses.json"),
    "utf-8"
  );
  return JSON.parse(file) as CoursesData;
});

export async function getCourse(id: string): Promise<Course | undefined> {
  const { courses } = await getCoursesData();
  return courses.find((c) => String(c.id) === id);
}