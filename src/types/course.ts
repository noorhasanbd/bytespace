export type Course = {
  id: number;
  title: string;
  author: string;
  category: string;
  featured?: boolean;
  image: string;
  lessons: number;
  duration: string;
  comments: number;
  rating: number;
  level: string;
  price: number;
  students: number;
  subtitle?: string;
  video?: string; 
};

export type CoursesData = {
  avatars: string[];
  categories: string[];
  courses: Course[];
};