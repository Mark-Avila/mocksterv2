import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { AuthState } from "./types";
import authService, { LoginData, RegisterData } from "./services/authService";

let token: string | null = null;

if (typeof window !== "undefined") {
  const stringToken = window.localStorage.getItem("token");
  token = stringToken ? JSON.parse(stringToken) : null;
}

const initialState: AuthState = {
  data: token ? token : null,
  loading: false,
  success: false,
  error: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, thunkApi) => {
    try {
      return await authService.register(userData);
    } catch (err: any) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: LoginData, thunkApi) => {
    try {
      return await authService.login(userData);
    } catch (err: any) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        state.data = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        state.data = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
      });
  },
});

export const { reset } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
