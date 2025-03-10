import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DishService } from '../../services/dish.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-add-dish-dialog',
  templateUrl: './add-dish-dialog.component.html',
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule

  ],
})
export class AddDishDialogComponent {
  dish = { id: 0, name: '', price: 0, description: '' };
  public token: string | null = localStorage.getItem('token');


  constructor(
    private dishService: DishService,
    public dialogRef: MatDialogRef<AddDishDialogComponent>
  ) { }

  addDish(): void {
    console.log(this.token);
    this.dishService.addDish(this.dish, this.token).subscribe(() => {
      this.dialogRef.close(true); // Закриваємо вікно та оновлюємо список
    });
  }
}
