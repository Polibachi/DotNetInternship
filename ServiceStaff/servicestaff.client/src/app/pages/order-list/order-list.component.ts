import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  imports: [CommonModule, MatCardModule]
})
export class OrderListComponent {
  @Input() orders: Order[] = [];
}
