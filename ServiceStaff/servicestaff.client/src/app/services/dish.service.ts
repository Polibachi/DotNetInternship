import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = 'https://localhost:7155/api/Dish/all'; // URL бекенду

  constructor(private http: HttpClient) { }

  getDishes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
