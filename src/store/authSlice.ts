// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "../interfaces/IAuthSlice";

const initialState: IAuthState = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role") as "admin" | "seller" | null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; role: "admin" | "seller" }>
    ) => {
      const { token, role } = action.payload;
      state.token = token;
      state.role = role;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
