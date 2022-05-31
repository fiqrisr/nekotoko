import {
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Upload,
  Typography,
  Space,
  Avatar,
  Select,
  Button,
  FormProps,
  useSelect,
  getValueFromEvent,
} from '@pankod/refine-antd';
import { useApiUrl } from '@pankod/refine-core';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { Category, Composition } from '@nekotoko/prisma/monolithic';
import { UnitSelect } from '@nekotoko/admin/components';

import productPlaceholder from '../assets/product-default-img.png';

const { Text } = Typography;

interface ProductFormProps {
  formProps: FormProps;
}

export const ProductForm = ({ formProps }: ProductFormProps) => {
  const { selectProps: categorySelectProps } = useSelect<Category>({
    resource: 'category',
    optionLabel: 'name',
  });
  const { selectProps: compositionSelectProps } = useSelect<Composition>({
    resource: 'composition',
    optionLabel: 'name',
  });

  const apiUrl = useApiUrl();

  return (
    <Form {...formProps} layout="vertical">
      <Row gutter={20}>
        <Col xs={24} lg={8}>
          <Form.Item>
            <Form.Item
              name="image"
              valuePropName="fileList"
              getValueFromEvent={getValueFromEvent}
              noStyle
            >
              <Upload.Dragger
                action={`${apiUrl}/product/upload-image`}
                headers={{
                  authorization: `Bearer ${localStorage.getItem(
                    'accessToken'
                  )}` as string,
                }}
                name="image"
                listType="picture"
                maxCount={1}
                style={{
                  border: 'none',
                  width: '100%',
                  background: 'none',
                }}
              >
                <Space direction="vertical" size={2}>
                  <Avatar
                    style={{
                      width: '100%',
                      height: '100%',
                      maxWidth: '200px',
                    }}
                    src={productPlaceholder}
                    alt="Image"
                  />
                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: '16px',
                      marginTop: '8px',
                    }}
                  >
                    Add product picture
                  </Text>
                </Space>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} lg={16}>
          <Row gutter={10}>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    max: 255,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    type: 'number',
                    min: 0,
                  },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) =>
                    value ? value.replace(/\$\s?|(,*)/g, '') : ''
                  }
                />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Category"
                name="category_id"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select {...categorySelectProps} />
              </Form.Item>
              <Form.Item
                name="product_compositions"
                label="Compositions"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Form.List name="product_compositions">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name }) => (
                        <Space
                          key={key}
                          style={{ display: 'flex' }}
                          align="baseline"
                        >
                          <Space>
                            <Form.Item name={[name, 'quantity']}>
                              <InputNumber
                                placeholder="quantity"
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ','
                                  )
                                }
                                parser={(value) =>
                                  value ? value.replace(/\$\s?|(,*)/g, '') : ''
                                }
                                addonAfter={
                                  <UnitSelect
                                    name={[name.toString(), 'unit']}
                                    width="120px"
                                  />
                                }
                              />
                            </Form.Item>
                            <Form.Item
                              name={[name, 'composition_id']}
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Select
                                {...compositionSelectProps}
                                style={{ minWidth: '110px' }}
                              />
                            </Form.Item>
                          </Space>
                          <span className="anticon">
                            <AiOutlineMinusCircle
                              size={18}
                              onClick={() => remove(name)}
                            />
                          </span>
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={
                            <span className="anticon">
                              <AiOutlinePlus />
                            </span>
                          }
                        >
                          Add composition
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
