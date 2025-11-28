export interface CartItemDTO {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface CartDTO {
  items: CartItemDTO[];
  total: number;
}
