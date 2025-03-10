import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderListComponent } from '../order-list/order-list.component';
import { SignalrService } from '../../services/signalr.service'; // Додаємо SignalrService
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-kitchen',
  standalone: true,
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
  imports: [CommonModule, OrderListComponent]
})
export class KitchenComponent {
  orders: any[] = [];

  ngOnInit() {
    this.GetOrders();
  }
  constructor(private orderService: OrderService, private signalrService: SignalrService) { } // Інжектуємо SignalrService

  markReady(order: any) {
    order.status = 'Готово';
    this.signalrService.showNotification(`Страва "${order.name}" готова!`); // Викликаємо сповіщення
  }
  public GetOrders(): void {
    this.orderService.getOrdersByStatus(0).subscribe((data) => {
      this.orders = data;  // присвоюємо дані для статусу 0
      this.orderService.getOrdersByStatus(1).subscribe((data2) => {
        this.orders = [...this.orders, ...data2];  // додаємо дані для статусу 1
      });
    });
  }


}

