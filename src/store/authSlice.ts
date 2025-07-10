import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface auth {
  isloggedin: boolean;
  username: string;
  password: string;
}

const initialState = {
  isloggedin: localStorage.getItem("isloggedin") === "true",
  username: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    login: (state) => {
      if (state.username === "admin" && state.password === "pass@123") {
         state.isloggedin = true;
         localStorage.setItem("isloggedin", "true");
      } 
    },
    logout: (state) => {
      state.isloggedin = false;
      state.username = '';
      state.password = '';
      localStorage.removeItem("isloggedin");
    },
  },
});

export const { setUsername,setPassword,login, logout } = authSlice.actions;
export default authSlice.reducer;
