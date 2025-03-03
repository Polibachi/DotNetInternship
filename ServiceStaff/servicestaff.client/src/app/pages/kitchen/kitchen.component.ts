/*import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderListComponent } from '../order-list/order-list.component';
import { SignalrService } from '../../services/signalr.service'; // Додаємо SignalrService

@Component({
  selector: 'app-kitchen',
  standalone: true,
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
  imports: [CommonModule, OrderListComponent]
})
export class KitchenComponent {
  orders: any[] = [];

  constructor(private signalrService: SignalrService) { } // Інжектуємо SignalrService

  markReady(order: any) {
    order.status = 'Готово';
    this.signalrService.showNotification(`Страва "${order.name}" готова!`); // Викликаємо сповіщення
  }
}
*/
