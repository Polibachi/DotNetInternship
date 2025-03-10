
import { MatMenuModule } from '@angular/material/menu'; // Додайте цей імпорт
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChangeDetectionStrategy,  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AddDishDialogComponent } from '../add-dish-dialog/add-dish-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
    CommonModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ] // Додайте цей модуль
})

export class MenuComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(private dishService: DishService, private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes(): void {
    this.dishService.getDishes().subscribe((data) => {
      this.dishes = data;
    });
  }

  openAddDishDialog(): void {
    const dialogRef = this.dialog.open(AddDishDialogComponent, {
      width: '800px', // Оптимізований розмір
      height: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDishes();
      }
    });
  }
  // Додаємо властивість для відображення останнього ID + 1
  getLastDishIdPlusOne(): number {
    const lastDish = this.dishes[this.dishes.length - 1];
    return lastDish ? lastDish.id + 1 : 1; // Якщо страви є, додаємо 1 до останнього ID, якщо немає, то виводимо 1
  }

  getDishImage(id: number): string {
    return `assets/images/dishes/${id}.jpeg`;
  }
}

