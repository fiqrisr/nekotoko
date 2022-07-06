import { useShow } from '@pankod/refine-core';
import { Show, Typography } from '@pankod/refine-antd';
import { Composition } from '@nekotoko/db-monolithic';

const { Title, Text } = Typography;

export const CompositionShow = () => {
  const { queryResult } = useShow<Composition>();
  const { data, isLoading } = queryResult;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Name</Title>
      <Text>{data?.data.name}</Text>

      <Title level={5}>Unit</Title>
      <Text>{data?.data.unit}</Text>

      <Title level={5}>Stock</Title>
      <Text>{data?.data.stock}</Text>
    </Show>
  );
};
