import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Для маршрутизації
import { MatToolbarModule } from '@angular/material/toolbar'; // Для mat-toolbar
import { MatMenuModule } from '@angular/material/menu'; // Для mat-menu
import { MatButtonModule } from '@angular/material/button'; // Для кнопок
import { MatIconModule } from '@angular/material/icon'; // Для mat-icon
import { OrderListComponent } from '../order-list/order-list.component';
import { SignalrService } from '../../services/signalr.service';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-kitchen',
  standalone: true,
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
  imports: [
    CommonModule,
    OrderListComponent,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule, // Додаємо для маршрутизації
   
  ]
})
export class KitchenComponent {
  orders: any[] = [];

  ngOnInit() {
    this.GetOrders();
  }

  constructor(private orderService: OrderService, private signalrService: SignalrService) { }

  markReady(order: any) {
    order.status = 'Готово';
    this.signalrService.showNotification(`Страва "${order.name}" готова!`);
  }

  public GetOrders(): void {
    this.orderService.getOrdersByStatus(0).subscribe((data) => {
      this.orders = data;
      this.orderService.getOrdersByStatus(1).subscribe((data2) => {
        this.orders = [...this.orders, ...data2];
      });
    });
  }
}
