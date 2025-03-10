export interface Order {
  id: number;
  tableNumber: number;
  createdAt: Date;
  orderItems: OrderItem[];
}

export interface OrderItem {
  dishId: number;
  quantity: number;
}
