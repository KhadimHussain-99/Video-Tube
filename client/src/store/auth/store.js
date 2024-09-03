import { createSlice } from "@reduxjs/toolkit";

const loadAuthState = () => {
  try {
    const serializedCheck = localStorage.getItem("auth");
    return serializedCheck ? JSON.parse(serializedCheck) : null;
  } catch (error) {
    console.error(
      "Error loading authentication state from localStorage:",
      error
    );
    return null;
  }
};

const saveAuthState = (state) => {
  try {
    const authState = JSON.stringify(state);
    localStorage.setItem("auth", authState);
  } catch (error) {
    console.error("Error save authentication state to localStorage:", error);
  }
};

const initialState = loadAuthState() || {
  user: null,
  token: null,
  verified: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const newState = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        verified: action.payload.verified,
      };
      saveAuthState(newState);
      return newState;
    },
    clearAuth: (state) => {
      const newState = {
        user: null,
        token: null,
        verified: null,
      };
      saveAuthState(newState);
      return newState;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
