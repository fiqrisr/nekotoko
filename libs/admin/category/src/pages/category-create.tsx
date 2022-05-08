import { useForm, Form, Input, Create } from '@pankod/refine-antd';
import { Category } from '@nekotoko/admin/types';

export const CategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm<Category>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
