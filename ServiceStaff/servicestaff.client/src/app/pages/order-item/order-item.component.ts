import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  imports: [CommonModule]
})
export class OrderItemComponent {
  @Input() order: any; // Отримуємо вхідні дані

  markReady() {
    if (this.order) {
      this.order.status = 'Готово';
      console.log('Замовлення виконане:', this.order);
    } else {
      console.error('order не визначений');
    }
  }
}
