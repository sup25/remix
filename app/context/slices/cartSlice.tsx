import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "~/components/schema/Proudct.schema";

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
}

const initialState: CartState = {
  cart:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("shopping-cart") || "[]")
      : [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ product: action.payload, quantity: 1 });
      }

      state.isCartOpen = true;
      localStorage.setItem("shopping-cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
      localStorage.setItem("shopping-cart", JSON.stringify(state.cart));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      if (quantity < 1) return;

      const item = state.cart.find((item) => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem("shopping-cart", JSON.stringify(state.cart));
      }
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("shopping-cart", JSON.stringify(state.cart));
    },
    setIsCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setIsCartOpen,
} = cartSlice.actions;
export default cartSlice.reducer;
