import { createSlice,configureStore } from "@reduxjs/toolkit";

const darkThemeState={
    isdarktheme:false,
}

const themeSlice=createSlice({
    name:"theme",
    initialState:darkThemeState,
    reducers:{
        toggletheme:(state)=>{
            state.isdarktheme=!state.isdarktheme
        }
    }
})

const store =configureStore({
    reducer:{
        theme: themeSlice.reducer
    }
})

export const toggletheme=themeSlice.actions

export const selectTheme=(state)=>state.theme.toggletheme
export default store