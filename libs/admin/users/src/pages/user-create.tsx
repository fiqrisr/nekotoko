import { useForm, Form, Input, Create, Select } from '@pankod/refine-antd';
import { User } from '@nekotoko/prisma/monolithic';

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm<User>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Roles"
          name="roles"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            options={[
              {
                label: 'admin',
                value: 'admin',
              },
              {
                label: 'user',
                value: 'user',
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
