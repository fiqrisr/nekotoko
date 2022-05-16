import { Form, Select } from '@pankod/refine-antd';

import { MEASUREMENT_UNITS } from '../../constants';

export const UnitSelect = () => {
  return (
    <Form.Item name="unit" noStyle>
      <Select defaultValue="g (gram)" style={{ width: '140px' }}>
        {Object.entries(MEASUREMENT_UNITS).map(([key, value]) => (
          <Select.Option key={key} value={key}>
            {key} ({value})
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
