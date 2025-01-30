
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    id: number | null;
    name: string | null;
    email: string | null;
  };
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: {
    id: null,
    name: null,
    email: null,
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ id: number; name: string; email: string }>
    ) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = { id: null, name: null, email: null };
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
