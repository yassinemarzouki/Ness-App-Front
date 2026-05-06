export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  image: string;
  tags: string[];
  students: number;
  duration: string;
}

export interface CartItem {
  course: Course;
  quantity: number;
}
