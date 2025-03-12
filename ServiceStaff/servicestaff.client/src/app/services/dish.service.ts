
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface Dish {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private apiUrl = 'https://localhost:7155/api/Dish'; // Базовий URL бекенду
  public token: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Dish[]> {

    return this.http.get<Dish[]>(`${this.apiUrl}/all`);
  }


  addDish(dish: any, token: string | null) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/add`, dish, { headers });
  }

  getDishById(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`);
  }

}
