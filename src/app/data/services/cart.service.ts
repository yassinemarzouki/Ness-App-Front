import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course, CartItem } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private readonly STORAGE_KEY = 'elearning-cart';

  constructor() {
    this.loadCart();
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(course: Course): void {
    const existingItem = this.cartItems.find(item => item.course.id === course.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ course, quantity: 1 });
    }
    
    this.saveCart();
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(courseId: number): void {
    this.cartItems = this.cartItems.filter(item => item.course.id !== courseId);
    this.saveCart();
    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(courseId: number, quantity: number): void {
    const item = this.cartItems.find(i => i.course.id === courseId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(courseId);
      } else {
        this.saveCart();
        this.cartSubject.next([...this.cartItems]);
      }
    }
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.course.price * item.quantity), 0);
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
    this.cartSubject.next([]);
  }

  private saveCart(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems));
  }

  private loadCart(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        this.cartItems = JSON.parse(stored);
        this.cartSubject.next([...this.cartItems]);
      } catch (e) {
        this.cartItems = [];
      }
    }
  }
}
