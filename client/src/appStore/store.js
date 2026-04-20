import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice.js"
import authReducer from "../features/authSlice.js"
import hamburgerMenuReducer from "../features/hamburgerMenuSlice.js"
import { api } from "../services/baseApi.js";

export const store = configureStore({
    reducer:{
        theme:themeReducer,
        auth:authReducer,
        hamburgerMenu:hamburgerMenuReducer, 
        // below is for using RTK Query.
        [api.reducerPath] : api.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})