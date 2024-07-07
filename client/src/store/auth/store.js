import { createSlice } from "@reduxjs/toolkit";

const localAuthState = () => {
  try {
    localAuth = localStorage.getItem("auth");
    return localAuth ? JSON.parse(localAuth) : null;
  } catch (error) {
    console.error("Error Loading Auth from localStorage", error);
    return null;
  }
};

const saveAuthState = (state) => {
  try {
    const localAuth = JSON.stringify(state);
    localStorage.setItem("auth", localAuth);
  } catch (error) {
    console.error("Error Saving Auth from localStorage", error);
  }
};

const initialState = localAuthState() || {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const newAuthState = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
      saveAuthState(newAuthState);
      return newAuthState;
    },
    clearAuth: (state) => {
      const newAuthState = {
        token: null,
        user: null,
      };
      saveAuthState(newAuthState);
      return newAuthState;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
