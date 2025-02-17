import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  standalone: true,
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  imports: [CommonModule, OrderListComponent] // Додаємо OrderListComponent
})

export class KitchenComponent {
  orders = [
    { name: 'Борщ', status: 'Очікує' },
    { name: 'Піца', status: 'Очікує' }
  ];

  markReady(order: any) {
    order.status = 'Готово';
  }
}
