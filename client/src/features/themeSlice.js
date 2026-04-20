import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode:false
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        
    }
})

// export {} from themeSlice.actions;

export default themeSlice.reducer;