import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isHamburgerOpen: false
}

const hamburgerMenuSlice = createSlice({
    name: "hamburgerMenu",
    initialState,
    reducers: {
        setIsHamburgerOpen: (state) => {
            state.isHamburgerOpen = !state.isHamburgerOpen
        }
    }
})

export const {setIsHamburgerOpen} = hamburgerMenuSlice.actions;

export default hamburgerMenuSlice.reducer;