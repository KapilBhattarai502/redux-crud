import { createSlice } from "@reduxjs/toolkit";

interface drawerType{
    open:boolean,
    editingId:string | null,
}

const initialState:drawerType={
    open:false,
    editingId:null,
    
}
const DrawerSlice=createSlice({
    name:'drawer',
    initialState,

    reducers:{
        openDrawer:(state,action)=>{
            state.open=true;
            state.editingId=action.payload;

        },
        closeDrawer:(state)=>{
             state.open=false;
             state.editingId=null;
        }
    }

    


})

export const { openDrawer,closeDrawer } = DrawerSlice.actions


export default DrawerSlice.reducer

