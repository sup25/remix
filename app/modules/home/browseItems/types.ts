export interface IProduct {
  value: string;
  label: string;
  count: number;
}

export interface IBrowseItemsProps {
  heading: string;
  products: IProduct[];
  handler: () => void;
  link: string;
}
