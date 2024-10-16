import { createSlice } from "@reduxjs/toolkit";

export const userslice=createSlice({
    name:"userslice",
     initialState :{
        value: 0,
      },
    reducers:{
        setUser(state,action){
            state.user=action.playload
        },
        removeUser(state){
            state.user=null
        }
    }
})

export const {setUser,removeUser}=userslice.actions;
export const userslicepath = (state) => state.userslice.user;