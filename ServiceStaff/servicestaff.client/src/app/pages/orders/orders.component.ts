import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { SignalrService } from '../../services/signalr.service';
import { Order, OrderItem } from '../../models/order.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, OrderListComponent]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  newOrder: Order = { id: 0, tableNumber: 0, createdAt: new Date(), orderItems: [] };

  constructor(private orderService: OrderService, private signalrService: SignalrService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  addOrder() {
    if (this.newOrder.tableNumber && this.newOrder.orderItems.length > 0) {
      this.orderService.createOrder(this.newOrder).subscribe((order: Order) => {
        this.orders.push(order);
        this.signalrService.showNotification(`Замовлення додано!`);
        this.newOrder = { id: 0, tableNumber: 0, createdAt: new Date(), orderItems: [] };
      });
    }
  }

  addOrderItem(dishId: string, quantity: string) {
    this.newOrder.orderItems.push({ dishId: Number(dishId), quantity: Number(quantity) });
  }
}
