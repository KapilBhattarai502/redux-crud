import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { useGet } from "../hooks/useGetData";  // Adjust the import path as necessary
import Loader from "./Loader";
import DrawerComponent from "./DrawerComponent";
import { openDrawer } from "../features/DrawerSlice/DrawerSlice";
import { useDeleteData } from "../hooks/useDeleteData"; // Import your custom hook
import useGetPost from "../hooks/useGetPost";

interface DataType {
  id: string;
  fullname: string;
  age: number;
  address: string;
}

const Home: React.FC = () => {
  const[response,setResponse]=useState()
  const {mutate}=useGetPost(setResponse)
  const dispatch = useDispatch();
  const notify = () => toast.success('Deleted Successfully');
  const navigate = useNavigate();

  // Use custom hook to fetch data
  const [params, setParams] = useState({
    order: "",
    search: "",
    status: true,
  });
  const { data: fetchedData, isLoading, isError } = useGet(params);

  // Call the custom hook to handle delete action
  const { mutate: deleteUser } = useDeleteData();

  const createUser = () => {
    dispatch(openDrawer(null));
    // navigate("/create");
  };

  const handleEdit = (id: string) => {
    dispatch(openDrawer(id));
    mutate(id)
  };

  const handleDelete = (id: string) => {
    // Call the delete mutation when the user clicks delete
    deleteUser(id);  // Now deleteUser is directly used inside the component
    notify();
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.id)}>Edit</Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }
  if (isError) return <p>Error fetching data</p>;

  return (
    <>
      <div className="">
        <div className="mb-2 flex gap-2">
          <Button type="primary" className="bg-green-400 p-2" onClick={createUser}>
            Create
          </Button>
          <PlusOutlined />
        </div>
        <Table<DataType> columns={columns} dataSource={fetchedData} rowKey="id" />
      </div>
      <Toaster />
      <DrawerComponent />
    </>
  );
};

export default Home;
