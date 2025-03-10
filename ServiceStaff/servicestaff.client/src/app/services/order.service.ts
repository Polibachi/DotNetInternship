import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Order } from '../models/order.model'; // Перевірка правильного шляху до моделі

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7155/api/Order';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  createOrder(orderData: any): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/create`, orderData, { headers: this.getHeaders() });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getOrdersByStatus(status: Number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/status/${status}`, { headers: this.getHeaders() });
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/status/${orderId}`, `"${status}"`, { headers: this.getHeaders() });
  }
}
