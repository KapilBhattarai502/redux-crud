import React, { useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Space, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { closeDrawer } from '../features/DrawerSlice/DrawerSlice';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchUserById = async (id: string) => {
  const response = await axios.get(`http://localhost:3000/users/${id}`);
  return response.data;
};

const updateUserById = async (id: string, data: any) => {
  await axios.put(`http://localhost:3000/users/${id}`, data);
};

const createUser = async (data: any) => {
  await axios.post('http://localhost:3000/users', data);
};

const DrawerComponent: React.FC = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state) => state.drawer.open);
  const editingId = useSelector((state) => state.drawer.editingId);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: user } = useQuery(
    ['user', editingId],
    () => fetchUserById(editingId),
    { enabled: !!editingId } // Only fetch if editingId is set
  );

 

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user); // Populate form with user data
    } else {
      form.resetFields(); // Clear form if creating a new user
    }
  }, [user, form]);

  const onClose = () => {
    dispatch(closeDrawer());
  };

  const updateMutation = useMutation(
    (updatedData: any) => updateUserById(editingId, updatedData),
    {
      onSuccess: () => {
        message.success('User updated successfully');
        queryClient.invalidateQueries(['user', editingId]);
        queryClient.invalidateQueries('getCall');
        onClose();
      },
      onError: () => {
        message.error('Failed to update user');
      },
    }
  );

  const createMutation = useMutation(
    (newData: any) => createUser(newData),
    {
      onSuccess: () => {
        message.success('User created successfully');
        queryClient.invalidateQueries('getCall');
        onClose();
      },
      onError: () => {
        message.error('Failed to create user');
      },
    }
  );

  const onFinish = (values: any) => {
    if (editingId) {
      updateMutation.mutate(values); // Update if editingId is set
    } else {
      createMutation.mutate(values); // Create if editingId is null
    }
  };

  return (
    <>
      <Drawer
        title={editingId ? "Edit User Details" : "Create New User"}
        width={400}
        onClose={onClose}
        open={isDrawerOpen}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => form.submit()} type="primary">
              {editingId ? "Edit" : "Create"}
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="fullname"
                label="Name"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="age"
                label="Age"
                rules={[{ required: true, message: 'Please enter age' }]}
              >
                <Input placeholder="Please enter age" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please enter address' }]}
              >
                <Input placeholder="Please enter address" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
