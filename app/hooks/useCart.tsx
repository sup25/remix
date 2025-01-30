import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "~/components/schema/Proudct.schema";
import {
  addToCart,
  clearCart,
  removeFromCart,
  setIsCartOpen,
  updateQuantity,
} from "~/context/slices/cartSlice";
import { RootState } from "~/context/store";

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return {
    cart,
    isCartOpen,
    totalItems,
    setIsCartOpen: (isOpen: boolean) => dispatch(setIsCartOpen(isOpen)),
    addToCart: (product: IProduct) => dispatch(addToCart(product)),
    removeFromCart: (productId: number) => dispatch(removeFromCart(productId)),
    updateQuantity: (productId: number, quantity: number) =>
      dispatch(updateQuantity({ productId, quantity })),
    clearCart: () => dispatch(clearCart()),
  };
};
