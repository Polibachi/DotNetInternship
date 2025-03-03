import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderListComponent } from '../order-list/order-list.component';
import { FormsModule } from '@angular/forms';
import { SignalrService } from '../../services/signalr.service'; // Додаємо SignalrService

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [CommonModule, FormsModule, OrderListComponent]
})
export class OrdersComponent {
  orders: any[] = [];
  newDish: string = '';

  constructor(private signalrService: SignalrService) { } // Інжектуємо SignalrService

  addOrder() {
    if (this.newDish) {
      this.orders.push({ name: this.newDish, status: 'Очікує' });
      this.signalrService.showNotification(`Замовлення "${this.newDish}" додано!`); // Викликаємо сповіщення
      this.newDish = '';
    }
  }
}
