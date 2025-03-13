import { Component, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { OrderItemComponent } from '../order-item/order-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Order, OrderItem } from '../../models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  imports: [CommonModule, MatCardModule, FormsModule, MatCheckboxModule]
})
export class OrderListComponent {
  @Input() orders: any[] = [];  // Масив замовлень
  @Input() status: string = "";  // Статус, який передається з батьківського компонента
  @Output() orderReady: EventEmitter<any> = new EventEmitter<any>();


  constructor(private cdRef: ChangeDetectorRef, private orderService: OrderService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders'] && changes['orders'].currentValue) {
      this.restoreCheckboxState();
    }
  }

  restoreCheckboxState(): void {
    console.log("start");

    // Викликаємо вручну ChangeDetectorRef.detectChanges після рендерингу
    this.cdRef.detectChanges();

    this.orders.forEach(order => {
      order.orderItems.forEach((item: OrderItem) => {
        const itemState = localStorage.getItem(`orderItem-${order.id}-${item.dishName}`);
        if (itemState !== null) {
          item.isChecked = JSON.parse(itemState);
        }
      });
    });
  }

  // Функція для збереження стану чекбокса в localStorage
  saveCheckboxState(order: any, dishName: string, isChecked: boolean): void {
    localStorage.setItem(`orderItem-${order}-${dishName}`, JSON.stringify(isChecked));
  }

  // Оновлений метод CompleteOrder
  CompleteOrder(order: any): void {
    this.orderService.updateOrderStatus(order.id, this.status).subscribe({
      next: (response) => {
        console.log('Статус замовлення оновлений на', this.status);
      },
      error: (error) => {
        console.error('Ігноруйте це', error);
      }
    });
  }



  // Цей метод буде викликати метод markReady() у дочірньому компоненті
  onOrderReady(order: any): void {
    this.orderReady.emit(order);  // Випромінює подію
  }
}
