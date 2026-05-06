import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      title: 'تطوير تطبيقات ويب مع Angular',
      description: 'تعلم تطوير تطبيقات ويب حديثة باستخدام Angular من الصفر',
      price: 155,
      rating: 4.8,
      reviews: 245,
      category: 'تطوير الويب',
      level: 'beginner',
      instructor: 'أحمد محمود',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
      tags: ['Angular', 'TypeScript', 'Web'],
      students: 1250,
      duration: '24 ساعة'
    },
    {
      id: 2,
      title: 'تصميم واجهات المستخدم بـ Figma',
      description: 'أتقن فن تصميم الواجهات الحديثة والمحترفة',
      price: 125,
      rating: 4.7,
      reviews: 189,
      category: 'التصميم',
      level: 'beginner',
      instructor: 'فاطمة محمد',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      tags: ['UI/UX', 'Figma', 'Design'],
      students: 890,
      duration: '18 ساعة'
    },
    {
      id: 3,
      title: 'البرمجة بلغة Python للمبتدئين',
      description: 'ابدأ رحلتك في البرمجة مع لغة Python الشهيرة',
      price: 140,
      rating: 4.9,
      reviews: 512,
      category: 'البرمجة',
      level: 'beginner',
      instructor: 'محمد علي',
      image: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8b08e?w=400&h=300&fit=crop',
      tags: ['Python', 'Programming', 'Basics'],
      students: 2100,
      duration: '32 ساعة'
    },
    {
      id: 4,
      title: 'إدارة قواعد البيانات SQL',
      description: 'تعلم إدارة البيانات بكفاءة باستخدام SQL',
      price: 170,
      rating: 4.6,
      reviews: 178,
      category: 'قواعس البيانات',
      level: 'intermediate',
      instructor: 'سارة أحمد',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70570ec0?w=400&h=300&fit=crop',
      tags: ['SQL', 'Database', 'Data'],
      students: 645,
      duration: '28 ساعة'
    },
    {
      id: 5,
      title: 'تطوير تطبيقات الجوال بـ React Native',
      description: 'ابني تطبيقات جوال احترافية لأنظمة iOS و Android',
      price: 93,
      rating: 4.5,
      reviews: 134,
      category: 'تطوير الويب',
      level: 'advanced',
      instructor: 'كريم عبدالله',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      tags: ['React Native', 'Mobile', 'JavaScript'],
      students: 456,
      duration: '40 ساعة'
    },
    {
      id: 6,
      title: 'الأمان السيبراني والحماية',
      description: 'تعلم أساسيات الأمان السيبراني وحماية البيانات',
      price: 186,
      rating: 4.8,
      reviews: 267,
      category: 'البرمجة',
      level: 'advanced',
      instructor: 'ليلى محمود',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      tags: ['Security', 'Cybersecurity', 'Protection'],
      students: 789,
      duration: '36 ساعة'
    },
    {
      id: 7,
      title: 'تطوير الواجهات الأمامية بـ Vue.js',
      description: 'أنشئ واجهات تفاعلية رائعة مع Vue.js',
      price: 140,
      rating: 4.7,
      reviews: 203,
      category: 'تطوير الويب',
      level: 'intermediate',
      instructor: 'محمود علي',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
      tags: ['Vue.js', 'Frontend', 'JavaScript'],
      students: 567,
      duration: '26 ساعة'
    },
    {
      id: 8,
      title: 'التسويق الرقمي والإعلانات',
      description: 'احترف التسويق عبر الإنترنت والإعلانات الممولة',
      price: 310,
      rating: 4.4,
      reviews: 156,
      category: 'التصميم',
      level: 'intermediate',
      instructor: 'نور محمد',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      tags: ['Marketing', 'Ads', 'Digital'],
      students: 923,
      duration: '20 ساعة'
    }
  ];

  private coursesSubject = new BehaviorSubject<Course[]>(this.courses);

  constructor() {}

  getCourses(): Observable<Course[]> {
    return this.coursesSubject.asObservable();
  }

  getCategories(): string[] {
    return [...new Set(this.courses.map((c: Course) => c.category))];
  }

  searchCourses(query: string): Course[] {
    return this.courses.filter((course: Course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }
}
