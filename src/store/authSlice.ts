import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  status: boolean;
  userData: any; // Replace 'any' with the actual type of your user data
}

const initialState: AuthState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      // console.log('redux data==', action.payload);
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
