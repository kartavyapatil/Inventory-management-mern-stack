import { createSlice } from "@reduxjs/toolkit";

export const sliderbarslice=createSlice({
    name:"sliderbarslice",
     initialState :{
        toggle:false,
        collapsed:false
      },
    reducers:{
        toggleslider(state){
            state.toggle=!state.toggle
        },
        collapsedSidebar(state){
            state.collapsed=!state.collapsed
        }
    }
})

export const {toggleslider,collapsedSidebar}=sliderbarslice.actions;
export const sliderbarslicePath = (state) => state.sliderbarslice;