import { IProduct } from "~/components/schema/Proudct.schema";

export interface IBrowseItemsProps {
  heading: string;
  products: IProduct[];
  handler: () => void;
  link: string;
}
