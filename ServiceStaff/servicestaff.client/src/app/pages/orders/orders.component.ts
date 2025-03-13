import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { DishService } from '../../services/dish.service';
import { SignalrService } from '../../services/signalr.service';
import { Order, OrderItem } from '../../models/order.model';
import { Dish } from '../../models/dish.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { OrderListComponent } from '../order-list/order-list.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    OrderListComponent
  ]
})
export class OrdersComponent implements OnInit {
  orderItems = JSON.parse(localStorage.getItem('cart') || '[]');
  orders: Order[] = [];
  dishes: Dish[] = [];
  totalPrice = 0;
  newOrder: Order = {
    id: 0,
    tableNumber: 0,
    createdAt: new Date(),
    orderItems: [],
    comment: '' // Додано поле коментаря
  };
  constructor(
    private orderService: OrderService,
    private dishService: DishService,
    private router: Router,
    private signalrService: SignalrService
  ) { }

  ngOnInit() {
    this.loadOrders();
    this.loadCart();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  loadCart(): void {
    const orderItems = localStorage.getItem('cart');
    this.dishes = []; // Очищуємо перед новим завантаженням

    this.orderItems.forEach((item: { dishId: number; quantity: number }) => {
      this.dishService.getDishById(item.dishId).subscribe((dish) => {
        console.log(dish);
        this.totalPrice += dish.price * item.quantity;
        this.dishes.push(dish);
      });
    });
  }

  addOrder() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (!this.newOrder.tableNumber) {
      this.signalrService.showNotification("Вкажіть номер столу!");
      return;
    }

    if (cart.length === 0) {
      this.signalrService.showNotification("Корзина порожня!");
      return;
    }

    // Переконаємося, що коментар записаний у нове замовлення
    this.newOrder.orderItems = cart;
    this.newOrder.comment = this.newOrder.comment || ""; // Якщо коментар не заданий, залишаємо його порожнім

    this.orderService.createOrder(this.newOrder).subscribe((order: Order) => {
      this.orders.push(order);
      this.signalrService.showNotification(`Замовлення #${order.id} додано!`);
    });
    this.clearCart();
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.newOrder = {
      id: 0,
      tableNumber: 0,
      createdAt: new Date(),
      orderItems: [],
      comment: '' // Додано очищення коментаря
    };
    this.orderItems = [];
    this.dishes = [];
    this.totalPrice = 0;
  }

  logOut() {
    localStorage.removeItem('token');
    // Redirect to login page
    this.router.navigate(['/home']);
  }

  getDishImage(id: number): string {
    return `assets/images/dishes/${id}.jpeg`;
  }
}
