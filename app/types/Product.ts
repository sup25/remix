export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number; // Use 'number' instead of 'Float' in TypeScript
  stock: number;
  discountTag?: number; // Use optional chaining for nullable fields
  images: string[];
  description?: string;
  createdAt: string; // Use 'string' for DateTime representation in TypeScript
  updatedAt: string; // Use 'string' for DateTime representation in TypeScript
  slug: string;
  categories: string[];
}
