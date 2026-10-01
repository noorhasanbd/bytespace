"use client";

import { useEffect, useState } from "react";
import type { CoursesData } from "@/types/course";

export function useCourses() {
  const [data, setData] = useState<CoursesData | null>(null);
  const [error, setError] = useState(false);

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

  return { data, error };
}