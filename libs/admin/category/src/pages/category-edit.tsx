import { useForm, Form, Input, Edit } from '@pankod/refine-antd';
import { Category } from '@nekotoko/prisma/monolithic';

export const CategoryEdit = () => {
  const { formProps, saveButtonProps } = useForm<Category>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
