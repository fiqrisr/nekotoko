import { useForm, Form, Input, InputNumber, Edit } from '@pankod/refine-antd';
import { Composition } from '@nekotoko/db-monolithic';
import { UnitSelect } from '@nekotoko/admin/components';

export const CompositionEdit = () => {
  const { formProps, saveButtonProps } = useForm<Composition>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Stock" name="stock">
          <InputNumber addonAfter={<UnitSelect />} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
