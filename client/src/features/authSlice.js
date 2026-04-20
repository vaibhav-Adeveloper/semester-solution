import { React } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {signupAPI, loginAPI, logoutAPI, authAPI} from "./authApi.js";

export const signUser = createAsyncThunk(
    "auth/signup",
    async (formData, thunkAPI) => {
        try {
            return await signupAPI(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (formData, thunkAPI) => {
        try {
            return await loginAPI(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            return await logoutAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const checkAuth = createAsyncThunk(
    "auth/itsme",
    async(_, thunkAPI) => {
        try {
            return await authAPI();
        } catch (error) {
            console.log("hey i am a message from thunk of authAPI function");
            return thunkAPI.rejectWithValue("ERROR with rejectWithValues", error.message);
        }
    }
)

const initialState = {
    isAuthenticated:false,
    userData:{},
    error:{},
    loading: false,
    status: "idle",
    message: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        switchAuthentication: (state, action) => {
            state.isAuthenticated = !state.isAuthenticated;
            state.userData = action.payload.data;
        },
        clearError: (state) => {
            state.error = {}
        },
        resetStatus: (state) => {
            state.status = "idle";
            state.message = null;
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(signUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(signUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload.data;
            state.status = "signup_success";
            state.message = "Signed up successfully, please login"
        })
        .addCase(signUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.errors || "Signup failed";
            state.status = "error";
            state.message = action.payload.errors || "Already Sign up, please login now";
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            // console.log("action payload kai nadar kya hai", action.payload);
            state.loading = false;
            state.userData = action.payload.data;
            state.isAuthenticated = true;
            state.status = "login_success";
            state.message = "Welcome back. Start Studying...";
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.errors;
            state.status = "idle";
            state.message = action.payload.errors || "Login Failed.Try again with Valid Credentail.";
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.userData = {};
            state.isAuthenticated = false;
            state.loading = false;
        })
        .addCase(checkAuth.pending, (state) => {
            state.loading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.userData = action.payload.data;
        })
        .addCase(checkAuth.rejected, (state, action) => {
            state.loading = false;
            state.userData = {};
            state.isAuthenticated = false;
            state.error = action.payload.errors;
        })
    }
})

export const {switchAuthentication, clearError, resetStatus} = authSlice.actions;

export default authSlice.reducer;