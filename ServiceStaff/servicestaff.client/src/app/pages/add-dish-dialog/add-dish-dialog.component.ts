import { Component } from '@angular/core';

@Component({
  selector: 'app-dish-dialog',
  templateUrl: './dish-dialog.component.html',
  styleUrls: ['./dish-dialog.component.css']
})
export class DishDialogComponent {
  dish = { name: '', price: null, description: '' };
  dishes: any[] = []; // Масив для зберігання страв

  constructor(private dialogRef: any) { }

  // Метод для отримання останнього ID + 1
  getLastDishIdPlusOne() {
    const lastDish = this.dishes[this.dishes.length - 1];
    return lastDish ? lastDish.id + 1 : 1;
  }

  // Метод для додавання страви
  addDish() {
    // Перевірка на заповненість усіх полів
    if (this.dish.name && this.dish.price && this.dish.description) {
      // Додаємо нову страву в масив
      this.dishes.push({
        id: this.getLastDishIdPlusOne(),
        name: this.dish.name,
        price: this.dish.price,
        description: this.dish.description
      });

      // Закриваємо діалогове вікно після додавання
      this.dialogRef.close();

      // Очищаємо форму (можна пропустити, якщо не потрібно)
      this.dish = { name: '', price: null, description: '' };

      // Якщо потрібно перезавантажити сторінку:
      window.location.reload(); // Перезавантажуємо сторінку
    } else {
      // Якщо не всі поля заповнені, показуємо попередження
      alert('Будь ласка, заповніть всі поля!');
    }
  }
}
