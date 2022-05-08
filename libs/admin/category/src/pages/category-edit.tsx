import { useForm, Form, Input, Edit } from '@pankod/refine-antd';
import { Category } from '@nekotoko/admin/types';

export const CategoryEdit = () => {
  const { formProps, saveButtonProps } = useForm<Category>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
    </Edit>
  );
};
