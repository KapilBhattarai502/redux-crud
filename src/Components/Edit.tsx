import { Button } from "antd";
import { RootState } from "../Store/Store";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../features/UserSlice/UserSlice";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";



interface user {
  fullname: string;
  id: string;
  age: number;
  address: string;
}

const Edit = () => {
  const navigate=useNavigate()

  const dispatch = useDispatch();

  const [editUser, seteditUser] = useState<user>({
    fullname: "",
    id: "",
    age: 0,
    address: "",
  });
  const { id } = useParams();
  const selector = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    selector.map((person) => (person.id === id ? seteditUser(person) : null));
  }, [id]);


  const notify = () => toast.success('Edited Successfully');


  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(typeof(e));
    e.preventDefault()
    dispatch(updateUser({id,editUser}));
    notify()

    navigate("/")
  
    
    
    
  };

  return (
    <div>
      <form className="max-w-[500px]">
        <label><p className="mb-1">FullName</p></label>
        <input
          type="text"
          placeholder="FullName"
          className="w-full py-2 mb-2 border border-slate-500 px-4 rounded-sm outline-none"
          name="fullname"
          value={editUser?.fullname}
          onChange={(e) => {
            seteditUser((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
        />
       <label><p className="mb-1">Age</p></label>
        <input
          type="text"
          placeholder="Age"
          className="w-full py-2 mb-2 border border-slate-500 px-4 rounded-sm outline-none"
          name="age"
          value={editUser?.age}
          onChange={(e) => {
            seteditUser((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
        />
        <label><p className="mb-1">Address</p></label>
        <input
          type="text"
          placeholder="Address"
          className="w-full py-2 mb-2 border border-slate-500 px-4 rounded-sm outline-none"
          name="address"
          value={editUser?.address}
          onChange={(e) => {
            seteditUser((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
        />
        <Button type="primary" onClick={handleEdit}>Edit</Button>
      </form>
      <Toaster />
    </div>
  );
};

export default Edit;
