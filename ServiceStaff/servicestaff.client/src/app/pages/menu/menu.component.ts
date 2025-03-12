import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AddDishDialogComponent } from '../add-dish-dialog/add-dish-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';  // ✅ Додано Router
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode'; // ✅ Правильний імпорт

import '../add-dish-dialog/add-dish-dialog.component.css';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    MatListModule,
    CommonModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MenuComponent implements OnInit {
  dishes: Dish[] = [];
  cart: { dishId: number; quantity: number }[] = [];
  userRole: string = ''; // ✅ Додаємо змінну для ролі користувача

  constructor(
    private dishService: DishService,
    private authService: AuthService,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router  // ✅ Додаємо router
  ) { }

  ngOnInit(): void {
    this.loadDishes();
    this.loadCart();
    this.loadUserRole(); // ✅ Завантажуємо роль користувача
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  loadUserRole() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token); // ✅ Розкодовуємо токен
      this.userRole = decodedToken.role; // ✅ Отримуємо роль користувача
    }
  }

  loadDishes(): void {
    this.dishService.getDishes().subscribe((data) => {
      this.dishes = data;
    });
  }

  openAddDishDialog(): void {
    const dialogRef = this.dialog.open(AddDishDialogComponent, {
      width: '600px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDishes();
      }
    });
  }

  getLastDishIdPlusOne(): number {
    const lastDish = this.dishes[this.dishes.length - 1];
    return lastDish ? lastDish.id + 1 : 1;
  }

  getDishImage(id: number): string {
    return `assets/images/dishes/${id}.jpeg`;
  }

  addToCart(dishId: number) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    let existingItem = cart.find((item: any) => item.dishId === dishId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ dishId: dishId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
    this.loadDishes();
  }

  getDishName(dishId: number): string {
    const dish = this.dishes.find(d => d.id === dishId);
    return dish ? dish.name : 'Невідомо';
  }

  logOut() {
    this.authService.logOut();
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cart = [];
  }

  // ✅ Додано функцію для отримання тексту кнопки
  getButtonLabel(): string {
    switch (this.userRole) {
      case 'staff':
        return 'Переглянути замовлення';
      case 'chef':
        return 'Переглянути кухню';
      case 'admin':
        return 'Панель керування';
      default:
        return 'Головна';
    }
  }

  // ✅ Додано функцію для переходу при натисканні кнопки
  onButtonClick(): void {
    switch (this.userRole) {
      case 'staff':
        this.router.navigate(['/orders']);
        break;
      case 'chef':
        this.router.navigate(['/kitchen']);
        break;
      case 'admin':
        this.router.navigate(['/dashboard']);
        break;
      default:
        this.router.navigate(['/home']);
        break;
    }
  }
}
