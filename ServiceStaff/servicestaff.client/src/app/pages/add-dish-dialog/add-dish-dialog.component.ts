import { Component, signal } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DishService } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-dish-dialog',
  templateUrl: './add-dish-dialog.component.html',
  styleUrls: ['./add-dish-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class AddDishDialogComponent {
  dishForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  isLoading = signal(false);
  token = localStorage.getItem('token');

  constructor(
    private dishService: DishService,
    public dialogRef: MatDialogRef<AddDishDialogComponent>
  ) { }

  addDish(): void {
    if (this.dishForm.invalid) return;

    this.isLoading.set(true);

    this.dishService.addDish(this.dishForm.getRawValue(), this.token).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Помилка додавання страви:', err);
        this.isLoading.set(false);
      }
    }
    );
    this.dialogRef.close();
    window.location.reload();
  }
}
