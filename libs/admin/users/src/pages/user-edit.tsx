import { useForm, Form, Input, Edit, Select } from '@pankod/refine-antd';
import { User } from '@nekotoko/admin/types';

export const UserEdit = () => {
  const { formProps, saveButtonProps } = useForm<User>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Full Name" name="full_name">
          <Input />
        </Form.Item>
        <Form.Item label="New Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Roles" name="roles">
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
    </Edit>
  );
};
