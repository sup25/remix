export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  stock: number;
  discountTag?: number;
  images: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  categories: string[];
}
