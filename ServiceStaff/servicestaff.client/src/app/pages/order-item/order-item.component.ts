import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  imports: [CommonModule]
})
export class OrderItemComponent {
  @Input() order: any;  // Приймаємо одне замовлення
  @Output() orderReady: EventEmitter<any> = new EventEmitter<any>();

  markReady(): void {
    if (this.order) {
      this.order.status = 'Готово';
      console.log('Замовлення виконане:', this.order);
      this.orderReady.emit(this.order);  // Відправляємо подію в батьківський компонент
    } else {
      console.error('order не визначений');
    }
  }
}
