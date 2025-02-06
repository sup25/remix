import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    name: string | null;
    email: string | null;
  };
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: {
    name: null,
    email: null,
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = { name: null, email: null };
      state.isAuthenticated = false;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { login, logout, setUser } = userSlice.actions;

export default userSlice.reducer;
