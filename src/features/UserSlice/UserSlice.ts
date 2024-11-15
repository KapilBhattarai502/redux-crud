import { createSlice,nanoid } from "@reduxjs/toolkit";

interface User {
    id:string
    fullname:string,
    age:number,
    address:string
    
}

interface initState {
    user: User[] 

}

const initialState:initState={
    user:[
        {
        id: "1",
        fullname: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
       
      },
      {
        id: "2",
        fullname: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
       
      },
      {
        id: "3",
        fullname: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        
      },
    ]
    

}



export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        createUser:(state,action)=>{
            console.log(action.payload);
            state.user.push({...action.payload,id:nanoid()});
        },

        updateUser:(state,action)=>{
            const {id,editUser}=action.payload;
            const isExist= state.user.find((person)=>person.id===id);

            isExist ? state.user=state.user.map((person)=>person.id===id ? {...person,...editUser} :person):null;


            

        },

        deleteUser:(state,action)=>{

            const id=action.payload;

            const isExist=state.user.find((person)=>person.id===id);
            isExist ? state.user=state.user.filter((person)=>person.id!==id) :null;

        }


    }
}) 


export const {createUser,updateUser,deleteUser} =userSlice.actions
export default userSlice.reducer