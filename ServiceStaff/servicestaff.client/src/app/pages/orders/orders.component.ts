import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  standalone: true,
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  imports: [CommonModule]
})
export class OrdersComponent {
  orders: { name: string, status: string }[] = [];
  newDish: string = '';

  addOrder() {
    if (this.newDish) {
      this.orders.push({ name: this.newDish, status: 'Очікує' });
      this.newDish = '';
    }
  }
}
