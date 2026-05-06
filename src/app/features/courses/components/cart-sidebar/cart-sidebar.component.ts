import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../../data/models/course.model';
import { CartService } from '../../../../data/services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss'
})
export class CartSidebarComponent {
  @Input() isOpen = false;
  @Input() items: CartItem[] = [];
  @Input() total = 0;
  @Output() close = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  onRemoveItem(courseId: number): void {
    this.cartService.removeFromCart(courseId);
  }

  onUpdateQuantity(courseId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(courseId, quantity);
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onCheckout(): void {
    alert('شكراً لك! سينقلك إلى صفحة الدفع قريباً.');
  }
}
