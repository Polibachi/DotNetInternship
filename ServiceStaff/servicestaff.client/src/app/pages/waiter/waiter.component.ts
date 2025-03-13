import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderListComponent } from '../order-list/order-list.component';
import { SignalrService } from '../../services/signalr.service'; // Додаємо SignalrService
import { OrderService } from '../../services/order.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-waiter',
  standalone: true,
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css'],
  imports: [CommonModule, OrderListComponent, HeaderComponent]
})
export class WaiterComponent {
  orders: any[] = [];

  ngOnInit() {
    this.GetOrders();
  }

  constructor(private orderService: OrderService, private signalrService: SignalrService) { }

  markServed(order: any) {
    order.status = 'Paid'; // Позначаємо замовлення як оплачене
    this.signalrService.showNotification(`Замовлення "${order.name}" подано та чекає оплати!`);
  }

  public GetOrders(): void {
    this.orderService.getOrdersByStatus(2).subscribe((data) => {
      this.orders = data;  // завантажуємо замовлення зі статусом "Completed"
    });
  }
}
