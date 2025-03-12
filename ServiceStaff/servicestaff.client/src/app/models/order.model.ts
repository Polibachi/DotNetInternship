export interface Order {
  id: number;
  tableNumber: number;
  createdAt: Date;
  orderItems: OrderItem[];
  comment?: string; // Нове поле
}

export interface OrderItem {
  dishId: number;
  quantity: number;
}
