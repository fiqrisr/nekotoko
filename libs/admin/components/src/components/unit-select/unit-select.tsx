import { Form, Select } from '@pankod/refine-antd';

import { MEASUREMENT_UNITS } from '../../constants';

interface UnitSelectProps {
  name?: string | string[];
  width?: string | number;
}

export const UnitSelect = ({
  name = 'unit',
  width = '140px',
}: UnitSelectProps) => {
  return (
    <Form.Item name={name} noStyle>
      <Select defaultValue="g (gram)" style={{ width }}>
        {Object.entries(MEASUREMENT_UNITS).map(([key, value]) => (
          <Select.Option key={key} value={key}>
            {key} ({value})
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
