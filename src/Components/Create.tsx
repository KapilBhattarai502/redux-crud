import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import type { FormItemProps } from "antd";
import toast, { Toaster } from "react-hot-toast";
import usePost from "../hooks/usePostData";
import { useNavigate } from "react-router-dom";

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
}

function toArr(
  str: string | number | (string | number)[]
): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup: React.FC<
  React.PropsWithChildren<MyFormItemGroupProps>
> = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(
    () => [...prefixPath, ...toArr(prefix)],
    [prefixPath, prefix]
  );

  return (
    <MyFormItemContext.Provider value={concatPath}>
      {children}
    </MyFormItemContext.Provider>
  );
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);

  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

const Create: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const {mutate:postMutate}=usePost();

  
  const navigate=useNavigate();

  const onFinish = (value: any) => {
    
    // dispatch(createUser(value.user));
    postMutate(value.user)

    setSubmitted(true);
    navigate("/");
  };

  return (
    <>
      <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
        <MyFormItemGroup prefix="user">
          <MyFormItem name="fullname" label="Full Name">
            <Input required />
          </MyFormItem>
          <MyFormItem name="address" label="Address">
            <Input />
          </MyFormItem>
          <MyFormItem name="age" label="Age">
            <Input />
          </MyFormItem>
        </MyFormItemGroup>

        <Button type="primary" htmlType="submit" disabled={submitted}>
          Submit
        </Button>
      </Form>
      <Toaster />
    </>
  );
};

export default Create;
