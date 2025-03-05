
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Dish[]>('https://localhost:7155/api/Dish/all')
      .subscribe((data) => {
        this.dishes = data;
      });
  }

  getDishImage(id: number): string {
    return `assets/images/dishes/${id}.jpeg`;
  }
}
