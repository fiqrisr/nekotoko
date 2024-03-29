import { useForm, Form, Input, InputNumber, Edit } from '@pankod/refine-antd';
import { Composition } from '@nekotoko/db-monolithic';
import { UnitSelect } from '@nekotoko/admin/components';

export const CompositionEdit = () => {
  const { formProps, saveButtonProps } = useForm<Composition>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          const { stock } = values as unknown as { stock: string };

          return (
            formProps.onFinish &&
            formProps.onFinish({
              ...values,
              stock: +stock,
            })
          );
        }}
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Stock" name="stock">
          <InputNumber addonAfter={<UnitSelect />} decimalSeparator="," />
        </Form.Item>
      </Form>
    </Edit>
  );
};
