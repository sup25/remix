import { IProduct } from "../schema/Proudct.schema";

export interface DrawerProps {
  cart: { product: IProduct; quantity: number }[];
  onClose: () => void;
}
