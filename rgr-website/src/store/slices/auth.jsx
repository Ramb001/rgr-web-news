import { createSlice } from "@reduxjs/toolkit";

const pocketbaseAuth = localStorage.getItem("pocketbase_auth");
const parsedAuth = pocketbaseAuth ? JSON.parse(pocketbaseAuth) : null;

const initialState = {
  token: parsedAuth?.token || null,
  auth_data: parsedAuth?.record || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { loginAction } = authSlice.actions;
export default authSlice.reducer;
