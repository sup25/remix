export interface IProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  stock: number;
  discountTag?: number | null;
  images: string[];
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  categories: string[];
}
