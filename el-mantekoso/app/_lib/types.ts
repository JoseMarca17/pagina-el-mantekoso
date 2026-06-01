export type StockStatus = "ok" | "low" | "none";

export interface Product {
  id: string;
  name: string;
  desc: string;
  fullDesc: string;
  price: number;
  oldPrice?: number;
  img: string;
  stock: StockStatus;
  stockCount?: number;
  badge: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  img: string;
}
