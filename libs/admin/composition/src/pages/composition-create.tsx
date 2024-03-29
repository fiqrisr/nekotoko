import { useForm, Form, Input, InputNumber, Create } from '@pankod/refine-antd';
import { Composition } from '@nekotoko/db-monolithic';
import { UnitSelect } from '@nekotoko/admin/components';

export const CompositionCreate = () => {
  const { formProps, saveButtonProps } = useForm<Composition>();

  return (
    <Create saveButtonProps={saveButtonProps}>
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
        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber addonAfter={<UnitSelect />} decimalSeparator="," />
        </Form.Item>
      </Form>
    </Create>
  );
};
