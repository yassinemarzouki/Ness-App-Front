import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoursesService } from '../../../data/services/courses.service';

import { CourseCardComponent } from '../components/course-card/course-card.component';
import { CartItem, Course } from '../../../data/models/course.model';
import { CartService } from '../../../data/services/cart.service';
import { CartSidebarComponent } from '../components/cart-sidebar/cart-sidebar.component';


@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent, CartSidebarComponent],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss'
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  @ViewChild('header') header!: ElementRef;
  
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  cartItems: CartItem[] = [];
  cartTotal = 0;
  isCartOpen = false;
  isFilterPanelOpen = false;
  searchQuery = '';
  selectedCategory = '';
  selectedLevel = '';
  categories: string[] = [];
  levels: Array<'beginner' | 'intermediate' | 'advanced'> = ['beginner', 'intermediate', 'advanced'];
  cartItemCount = 0;
  isHeaderScrolled = false;
  private lastScrollTop = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private coursesService: CoursesService,
    private cartService: CartService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadCategories();
    this.subscribeToCart();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      this.isHeaderScrolled = true;
    } else {
      this.isHeaderScrolled = false;
    }
    
    this.lastScrollTop = scrollTop;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    // Close filter panel when resizing to larger screens (desktop mode)
    if (window.innerWidth > 768) {
      this.closeFilterPanel();
    }
  }

  private loadCourses(): void {
    this.coursesService.getCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe(courses => {
        this.courses = courses;
        this.applyFilters();
      });
  }

  private loadCategories(): void {
    this.categories = this.coursesService.getCategories();
  }

  private subscribeToCart(): void {
    this.cartService.getCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe((items: CartItem[]) => {
        this.cartItems = items;
        this.cartTotal = this.cartService.getCartTotal();
        this.cartItemCount = this.cartService.getCartCount();
      });
  }

  private applyFilters(): void {
    let filtered = [...this.courses];

    // Apply search filter
    if (this.searchQuery.trim()) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.tags.some((tag: string) => tag.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(course => course.category === this.selectedCategory);
    }

    // Apply level filter
    if (this.selectedLevel) {
      filtered = filtered.filter(course => course.level === this.selectedLevel);
    }

    this.filteredCourses = filtered;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.applyFilters();
  }

  onLevelChange(level: string): void {
    this.selectedLevel = this.selectedLevel === level ? '' : level;
    this.applyFilters();
  }

  onClearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedLevel = '';
    this.applyFilters();
  }

  toggleFilterPanel(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }

  closeFilterPanel(): void {
    this.isFilterPanelOpen = false;
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const filterDropdown = this.elementRef.nativeElement.querySelector('.filters-dropdown');
    const hamburgerBtn = this.elementRef.nativeElement.querySelector('.hamburger-menu');

    if (
      filterDropdown &&
      !filterDropdown.contains(target) &&
      hamburgerBtn &&
      !hamburgerBtn.contains(target)
    ) {
      this.closeFilterPanel();
    }
  }

  onAddToCart(course: Course): void {
    this.cartService.addToCart(course);
    // Open cart sidebar when a course is added
    this.isCartOpen = true;
  }

  getLevelLabel(level: string): string {
    const labels: { [key: string]: string } = {
      'beginner': 'مبتدئ',
      'intermediate': 'متوسط',
      'advanced': 'متقدم'
    };
    return labels[level] || level;
  }
}
